#!/usr/bin/env python3
"""Safely update webdesign-start from its canonical GitHub repository."""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import uuid
import zipfile
from pathlib import Path, PurePosixPath


REMOTE_VERSION_URL = (
    "https://raw.githubusercontent.com/Standardan/webdesign-start/"
    "main/webdesign-start/VERSION"
)
REMOTE_ARCHIVE_URL = (
    "https://github.com/Standardan/webdesign-start/archive/refs/heads/main.zip"
)
CANONICAL_REMOTE = "github.com/Standardan/webdesign-start"
REQUIRED_PATHS = (
    "SKILL.md",
    "VERSION",
    "references/research.md",
    "references/brief-template.md",
    "references/build-standards.md",
    "references/strategic-loops.md",
    "references/discovery.md",
    "references/concept.md",
    "references/creative-direction.md",
    "references/review.md",
    "references/formats/index.md",
    "scripts/update_skill.py",
)
VERSION_RE = re.compile(
    r"^(?P<version>\d+\.\d+\.\d+)\s+(?P<date>\d{4}-\d{2}-\d{2})$"
)


class UpdateError(RuntimeError):
    """A safe, user-actionable update failure."""


def version_info(text: str) -> tuple[tuple[int, int, int], str]:
    match = VERSION_RE.fullmatch(text.strip())
    if not match:
        raise UpdateError("VERSION must use '<semver> <YYYY-MM-DD>'")
    label = match.group("version")
    return tuple(int(part) for part in label.split(".")), label


def read_version(skill_dir: Path) -> tuple[tuple[int, int, int], str]:
    try:
        return version_info((skill_dir / "VERSION").read_text(encoding="utf-8"))
    except OSError as exc:
        raise UpdateError(f"cannot read local VERSION: {exc}") from exc


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "webdesign-start-updater"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read()
    except Exception as exc:
        raise UpdateError(f"download failed: {exc}") from exc


def validate_candidate(skill_dir: Path) -> tuple[tuple[int, int, int], str]:
    for relative in REQUIRED_PATHS:
        if not (skill_dir / relative).is_file():
            raise UpdateError(f"downloaded skill is missing {relative}")

    frontmatter = (skill_dir / "SKILL.md").read_text(
        encoding="utf-8", errors="replace"
    )[:1000]
    if not re.search(r"(?m)^name:\s*webdesign-start\s*$", frontmatter):
        raise UpdateError("downloaded SKILL.md has the wrong skill name")

    return read_version(skill_dir)


def extract_skill(archive_path: Path, stage_dir: Path) -> None:
    try:
        archive = zipfile.ZipFile(archive_path)
    except (OSError, zipfile.BadZipFile) as exc:
        raise UpdateError(f"invalid update archive: {exc}") from exc

    with archive:
        version_entries = []
        for name in archive.namelist():
            parts = PurePosixPath(name).parts
            if len(parts) >= 2 and parts[-2:] == ("webdesign-start", "VERSION"):
                version_entries.append(name)

        if len(version_entries) != 1:
            raise UpdateError("archive does not contain one webdesign-start skill")

        version_path = PurePosixPath(version_entries[0])
        prefix = version_path.parent

        for member in archive.infolist():
            member_path = PurePosixPath(member.filename)
            try:
                relative = member_path.relative_to(prefix)
            except ValueError:
                continue

            if not relative.parts or member.is_dir():
                continue
            if relative.is_absolute() or ".." in relative.parts:
                raise UpdateError("archive contains an unsafe path")

            target = stage_dir.joinpath(*relative.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(member) as source, target.open("wb") as destination:
                shutil.copyfileobj(source, destination)


def path_is_within(child: Path, parent: Path) -> bool:
    try:
        child.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


def run_git(args: list[str], cwd: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=cwd,
        text=True,
        capture_output=True,
        check=False,
    )


def canonical_git_root(skill_dir: Path) -> Path | None:
    result = run_git(["rev-parse", "--show-toplevel"], skill_dir)
    if result.returncode != 0:
        return None

    root = Path(result.stdout.strip()).resolve()
    remote = run_git(["remote", "get-url", "origin"], root)
    if remote.returncode != 0:
        return None

    normalized = (
        remote.stdout.strip()
        .replace("\\", "/")
        .replace("github.com:", "github.com/")
        .removesuffix(".git")
    )
    if CANONICAL_REMOTE.lower() not in normalized.lower():
        return None

    try:
        tracked_path = (skill_dir / "SKILL.md").resolve().relative_to(root)
    except ValueError:
        return None
    tracked = run_git(
        ["ls-files", "--error-unmatch", tracked_path.as_posix()],
        root,
    )
    return root if tracked.returncode == 0 else None


def update_git_checkout(
    skill_dir: Path,
    current_label: str,
) -> dict[str, str]:
    root = canonical_git_root(skill_dir)
    if root is None:
        raise UpdateError("not a canonical git checkout")

    branch = run_git(["branch", "--show-current"], root)
    if branch.returncode != 0 or branch.stdout.strip() != "main":
        raise UpdateError("canonical checkout is not on main")

    dirty = run_git(["status", "--porcelain", "--untracked-files=no"], root)
    if dirty.returncode != 0 or dirty.stdout.strip():
        raise UpdateError("canonical checkout has tracked changes")

    pull = run_git(["pull", "--ff-only", "origin", "main"], root)
    if pull.returncode != 0:
        detail = pull.stderr.strip() or pull.stdout.strip() or "git pull failed"
        raise UpdateError(detail)

    _, updated_label = validate_candidate(skill_dir)
    return {
        "status": "updated",
        "from": current_label,
        "to": updated_label,
        "method": "git-fast-forward",
    }


def atomic_install(
    skill_dir: Path,
    stage_dir: Path,
    current_label: str,
    candidate_label: str,
) -> dict[str, str]:
    parent = skill_dir.parent.resolve()
    backup_dir = parent / f".{skill_dir.name}-backup-{uuid.uuid4().hex}"

    if path_is_within(Path.cwd(), skill_dir):
        os.chdir(parent)

    try:
        os.replace(skill_dir, backup_dir)
    except Exception as exc:
        raise UpdateError(f"could not stage the previous copy: {exc}") from exc

    try:
        os.replace(stage_dir, skill_dir)
        validate_candidate(skill_dir)
    except Exception as install_exc:
        try:
            if skill_dir.exists():
                shutil.rmtree(skill_dir)
            os.replace(backup_dir, skill_dir)
        except Exception as rollback_exc:
            raise UpdateError(
                "installation and rollback both failed; "
                f"backup remains at {backup_dir}: {rollback_exc}"
            ) from install_exc
        raise UpdateError(
            f"atomic install failed; previous copy restored: {install_exc}"
        ) from install_exc

    result = {
        "status": "updated",
        "from": current_label,
        "to": candidate_label,
        "method": "validated-archive-swap",
    }
    try:
        shutil.rmtree(backup_dir)
    except Exception as exc:
        result["warning"] = f"updated, but backup cleanup failed: {backup_dir}: {exc}"
    return result


def update_from_archive(
    skill_dir: Path,
    archive_path: Path,
    current_version: tuple[int, int, int],
    current_label: str,
    force: bool,
    expected_label: str | None = None,
) -> dict[str, str]:
    parent = skill_dir.parent.resolve()
    stage_dir = Path(
        tempfile.mkdtemp(prefix=f".{skill_dir.name}-update-", dir=parent)
    )
    try:
        extract_skill(archive_path, stage_dir)
        candidate_version, candidate_label = validate_candidate(stage_dir)
        if expected_label is not None and candidate_label != expected_label:
            raise UpdateError(
                "archive VERSION does not match the remote VERSION "
                f"({candidate_label} != {expected_label})"
            )
        if not force and candidate_version <= current_version:
            return {
                "status": "up-to-date",
                "version": current_label,
            }
        return atomic_install(
            skill_dir,
            stage_dir,
            current_label,
            candidate_label,
        )
    finally:
        if stage_dir.exists():
            shutil.rmtree(stage_dir)


def update(
    skill_dir: Path,
    archive_path: Path | None,
    force: bool,
) -> dict[str, str]:
    current_version, current_label = read_version(skill_dir)

    if archive_path is not None:
        return update_from_archive(
            skill_dir,
            archive_path.resolve(),
            current_version,
            current_label,
            force,
            None,
        )

    remote_version, remote_label = version_info(
        fetch_bytes(REMOTE_VERSION_URL).decode("utf-8")
    )
    if not force and remote_version <= current_version:
        return {"status": "up-to-date", "version": current_label}

    if canonical_git_root(skill_dir) is not None:
        return update_git_checkout(skill_dir, current_label)

    archive_bytes = fetch_bytes(REMOTE_ARCHIVE_URL)
    with tempfile.NamedTemporaryFile(suffix=".zip", delete=False) as archive_file:
        archive_file.write(archive_bytes)
        downloaded_archive = Path(archive_file.name)
    try:
        result = update_from_archive(
            skill_dir,
            downloaded_archive,
            current_version,
            current_label,
            force,
            remote_label,
        )
    finally:
        downloaded_archive.unlink(missing_ok=True)

    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--archive",
        type=Path,
        help="use a local repository ZIP instead of GitHub (for testing)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="install even when the candidate version is not newer",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    skill_dir = Path(__file__).resolve().parent.parent
    try:
        result = update(skill_dir, args.archive, args.force)
    except UpdateError as exc:
        print(json.dumps({"status": "error", "message": str(exc)}))
        return 1
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
