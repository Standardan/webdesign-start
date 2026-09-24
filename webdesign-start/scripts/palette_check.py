"""Palette check for webdesign-start (references/aesthetics.md, "Colour").

Usage: python3 palette_check.py tokens.json [screenshot.png ...]
Pass one screenshot per scroll depth (every 50-75% of a viewport) so colour is checked across the whole page,
not only the first frame.
tokens.json: [{"name", "hex", "role": ground|surface|ink|muted|accent|other, "area": 0-1,
               "on": [ground names], "field": bool, "stop": bool, "maximal": bool}]
The screenshot check needs Pillow (pip install pillow); everything else is standard library.
Prints PASS or one line per violation. Thresholds come from measuring the 100-page benchmark gallery.
"""
import sys, json, math
lin = lambda c: c / 3294.6 if c <= 10.31475 else ((c / 255 + .055) / 1.055) ** 2.4
def rgb(h): h = h.lstrip('#'); h = ''.join(c * 2 for c in h) if len(h) == 3 else h; return [int(h[i:i + 2], 16) for i in (0, 2, 4)]
def lch(p):  # sRGB 0-255 -> OKLCH (L 0-1, C, h degrees)
    r, g, b = map(lin, p); cb = lambda x: math.copysign(abs(x) ** (1 / 3), x)
    l, m, s = cb(.4122214708*r+.5363325363*g+.0514459929*b), cb(.2119034982*r+.6806995451*g+.1073969566*b), cb(.0883024619*r+.2817188376*g+.6299787005*b)
    L, a, B = .2104542553*l+.793617785*m-.0040720468*s, 1.9779984951*l-2.428592205*m+.4505937099*s, .0259040371*l+.7827717662*m-.808675766*s
    return L, math.hypot(a, B), math.degrees(math.atan2(B, a)) % 360
def cr(p, q): y = sorted(.2126*lin(c[0]) + .7152*lin(c[1]) + .0722*lin(c[2]) for c in (p, q)); return (y[1] + .05) / (y[0] + .05)
dh = lambda a, b: 180 - abs(abs(a - b) % 360 - 180)
def families(items):  # (L,C,h,area) -> [[hue, area, mean L]], 15-degree bins merged within 35 degrees, largest first
    bins, fam = {}, []
    for L, C, h, a in [i for i in items if i[1] >= .03]: b = bins.setdefault(int(h // 15), [0, 0]); b[0] += a; b[1] += L * a
    for k, (a, wl) in sorted(bins.items(), key=lambda kv: -kv[1][0]):
        f = next((f for f in fam if dh(f[0], k * 15 + 7.5) <= 35), None) or fam.append([k * 15 + 7.5, 0, 0]) or fam[-1]; f[1] += a; f[2] += wl
    return [[h, a, wl / a] for h, a, wl in fam if a > 0]
def area_rules(fam, tag, out):
    big = [f for f in fam if f[1] >= .15]; len(big) > 2 and out.append(f'{tag}: {len(big)} hue families each cover >=15% (max 2)')
    for f, g in [(f, g) for i, f in enumerate(big) for g in big[i + 1:] if dh(f[0], g[0]) > 130 and abs(f[2] - g[2]) < .30 and min(f[2], g[2]) < .50]: out.append(f'{tag}: near-complementary families h{f[0]:.0f}/h{g[0]:.0f} share the area at similar dark value (dL {abs(f[2]-g[2]):.2f}<.30) = mud')
def check(tokens, shot=None):
    out, T = [], [dict(t, p=rgb(t['hex']), o=lch(rgb(t['hex']))) for t in tokens]; R = lambda *r: [t for t in T if t['role'] in r]
    for g in R('ground', 'surface'):
        L, C, h = g['o']
        for role, need in (('ink', 7), ('muted', 4.5), ('accent', 3)):
            for i in [i for i in R(role) if g.get('name') in i.get('on', [g.get('name')])]: cr(i['p'], g['p']) < need and out.append(f"{role} {i['hex']} on {g['hex']}: {cr(i['p'], g['p']):.1f}:1 < {need}")
        if not ((.10 <= L <= .30 and C <= .07) or (L >= .88 and C <= .035) or g.get('field')): out.append(f"{g['role']} {g['hex']} L{L:.2f} C{C:.3f} outside ground bands")
    acc = R('accent'); sum(a.get('area', 0) for a in acc) > .05 and out.append('accent area > 5%'); any(dh(a['o'][2], b['o'][2]) > 10 for a in acc for b in acc) and out.append('accent tokens span >10 deg of hue: one accent hue only')
    for a in T:
        (L, C, h), s = a['o'], a.get('stop')
        if 80 <= h <= 110 and C >= .07 and L < .62 and not s: out.append(f"{a['hex']} dark yellow (L{L:.2f} h{h:.0f}) reads olive unless a metal-gradient stop or small text on light ground")
        for bL, bC, bh, b in [b['o'] + (b,) for b in T]:  # warm ramp: of two close warm hues the lighter must be the yellower
            if 40 <= h <= 110 and 40 <= bh <= 110 and min(C, bC) >= .10 and dh(h, bh) <= 30 and bL > L + .03 and bh < h - 6: out.append(f"ramp inverted: {b['hex']} lighter but redder than {a['hex']}")
    area_rules(families([t['o'] + (t.get('area', 0),) for t in T]), 'tokens', out)
    if shot:
        from PIL import Image; im = Image.open(shot).convert('RGB').resize((160, 100)); c = {}; P = [c.setdefault(p, lch(p)) for p in zip(*[iter(im.tobytes())] * 3)]
        fam = families([p + (1 / len(P),) for p in P]); area_rules(fam, 'screenshot', out); dom = fam[0][0] if fam else 0
        s = sum(p[1] >= .12 and dh(p[2], dom) > 35 for p in P) / len(P); lim = .12 if any(t.get('maximal') for t in tokens) else .05; s > lim and out.append(f'screenshot: accent (C>=.12, off the main hue) covers {s:.1%} > {lim:.0%}')
    return out
if __name__ == '__main__':
    toks = json.load(open(sys.argv[1]))
    out = check(toks)                                          # token rules
    for shot in sys.argv[2:]:                                  # screenshot rules, one pass per scroll depth
        out += [f'{shot}: {m}' for m in check(toks, shot) if m.startswith('screenshot')]
    print('\n'.join(out) or 'PASS')
