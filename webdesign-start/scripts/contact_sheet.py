"""Contact sheet for the side-by-side critique (references/better-every-time.md, section 3).

Usage: python3 contact_sheet.py -o sheet.png [--cols 2] [--scale 0.5] [--blind] frame1.png frame2.png ...

Puts the screenshots side by side with a letter in a bar above each, so a reviewer who has not seen the sites can
rank them. With --blind the order is shuffled (seeded by --seed) and the key (letter -> file) is printed to stdout,
not drawn on the sheet: keep it away from the reviewer. Pillow is the only dependency.
"""
import argparse, random, sys
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("contact_sheet.py needs Pillow (pip install pillow). Without it, place the screenshots side by side by hand.")

ap = argparse.ArgumentParser()
ap.add_argument("files", nargs="+")
ap.add_argument("-o", "--out", default="sheet.png")
ap.add_argument("--cols", type=int, default=0, help="columns (default: all in one row for phone frames, 2 for desktop frames)")
ap.add_argument("--scale", type=float, default=0, help="resize factor (default: 0.5 for wide frames, 0.62 for phone frames)")
ap.add_argument("--blind", action="store_true", help="shuffle and print the key instead of the file names")
ap.add_argument("--seed", type=int, default=7)
a = ap.parse_args()

files = list(a.files)
if a.blind:
    random.Random(a.seed).shuffle(files)
ims = [Image.open(f).convert("RGB") for f in files]
wide = ims[0].width > ims[0].height
scale = a.scale or (0.5 if wide else 0.62)
cols = a.cols or (2 if wide else len(ims))
ims = [im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale)))) for im in ims]
try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
except OSError:
    font = ImageFont.load_default()
gap = 20
bar = 56   # the letter sits in a bar above each frame, never over the picture (a label over a corner reads as clipped content)
labelled = []
for i, im in enumerate(ims):
    framed = Image.new("RGB", (im.width, im.height + bar), "black")
    framed.paste(im, (0, bar))
    ImageDraw.Draw(framed).text((14, 6), "ABCDEFGHIJ"[i], fill="white", font=font)
    labelled.append(framed)
ims = labelled
rows = [ims[r:r + cols] for r in range(0, len(ims), cols)]
W = max(sum(i.width for i in row) + gap * (len(row) - 1) for row in rows)
H = sum(max(i.height for i in row) for row in rows) + gap * (len(rows) - 1)
sheet = Image.new("RGB", (W, H), "#777777")
y = 0
for row in rows:
    x = 0
    for im in row:
        sheet.paste(im, (x, y)); x += im.width + gap
    y += max(i.height for i in row) + gap
sheet.save(a.out)
print(f"wrote {a.out} ({sheet.width}x{sheet.height})")
for i, f in enumerate(files):
    print("ABCDEFGHIJ"[i], "=", f)
