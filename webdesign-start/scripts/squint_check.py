"""Squint check for webdesign-start (references/aesthetics.md, "Depth and light").

Usage: python3 squint_check.py frame.png C0,R0,C1,R1
C0,R0,C1,R1 is the declared focal area in a 16x10 grid (0-based, inclusive): the subject plus any
headline that touches it, at most 40 cells (25% of the grid). For a single cell pass C,R.
Run it on the first frame and on the opening frame of every set-piece section.
The screenshot is blurred to 16x10 cells, the way a squinting eye sees it.

FAIL: the strongest cell (brightest on dark and mid scenes, darkest on light ones) lies outside the
      focal area, so something else pulls the eye first. Hermosa Baking failed here: its clock face
      out-shone the shop window it was built around.
WARN (calibrated on the 100-page benchmark gallery, below its 10th percentile):
      focal pull over the median under 35 levels, or a value range under 40 levels: may read flat.
WARN: cells outside the focal area within 90% of its pull (competing highlights to look at by eye).
Needs Pillow (pip install pillow).
"""
import sys, statistics as st
from PIL import Image

path = sys.argv[1]
box = list(map(int, sys.argv[2].split(',')))
c0, r0, c1, r1 = box * 2 if len(box) == 2 else box
if (c1 - c0 + 1) * (r1 - r0 + 1) > 40:   # 25% of the grid: a focal area bigger than this can't fail, so it isn't a focal point
    sys.exit(f'FAIL: the declared focal area covers {(c1 - c0 + 1) * (r1 - r0 + 1)} of 160 cells; declare the subject itself (at most 40 cells, 25%)')
cells = list(Image.open(path).convert('L').resize((16, 10), Image.BOX).tobytes())
med = st.median(cells)
light = med > 150                                    # light scenes: the subject is the darkest mass
pull = [(med - v) if light else (v - med) for v in cells]
inside = lambda j: c0 - 1 <= j % 16 <= c1 + 1 and r0 - 1 <= j // 16 <= r1 + 1
best = max(range(160), key=pull.__getitem__)
fpull = max(pull[j] for j in range(160) if inside(j))
fails, warns = [], []
if not inside(best):
    fails.append(f'the strongest cell is {(best % 16, best // 16)}, outside the focal area {c0},{r0}-{c1},{r1}: '
                 'something else draws the eye first')
rivals = [(j % 16, j // 16) for j in range(160) if not inside(j) and fpull > 0 and pull[j] >= .9 * fpull]
if rivals and not fails:
    warns.append(f'cells {rivals[:5]} are nearly as strong as the subject: check they are meant to compete')
if fpull < 35:
    warns.append(f'focal pull {fpull:.0f} over the median (gallery p10 is 35): the subject may not stand out')
if max(cells) - min(cells) < 40:
    warns.append(f'value range {max(cells) - min(cells)} (gallery p10 is 40): the frame may read flat')
print('\n'.join(['FAIL: ' + f for f in fails] + ['WARN: ' + w for w in warns])
      or f'PASS (focal pull {fpull:.0f}, range {max(cells) - min(cells)})')
