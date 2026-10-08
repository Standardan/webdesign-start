#!/usr/bin/env python3
"""Near-blank frame check for generated or screenshot-derived art (hero plates, crops, thumbnails).

Usage: python3 blank_check.py <image> [<image> ...]      (exit 1 if any image is near-blank)

An image fails when its luminance standard deviation is under 20 (a white screen, a flat colour, a card with
the text removed) or when one tone covers more than half of it. Needs Pillow. Run it on every plate before it
goes into a hero, a carousel or a thumbnail strip, and look at what passes: a frame can have variance and
still be a picture of nothing (a lone white card on a pink ground).
"""
import sys
from PIL import Image, ImageStat

bad = 0
for f in sys.argv[1:]:
    im = Image.open(f).convert('L').resize((160, 100))
    sd = ImageStat.Stat(im).stddev[0]
    top = max(im.histogram()) / (160 * 100)
    flag = sd < 20 or top > 0.5
    bad += flag
    print(f"{'BLANK' if flag else 'ok   '} {f}  stddev {sd:.1f}  one-tone {top:.0%}")
sys.exit(1 if bad else 0)
