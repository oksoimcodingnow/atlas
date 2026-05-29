"""Generate Atlas PWA icons — constellation 'A' on dark gradient.

Run with quant's venv (Pillow available):
    C:\\Users\\HOME\\quant\\.venv\\Scripts\\python.exe generate_icons.py
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
import random

OUT = Path(__file__).resolve().parent


def make_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (10, 10, 20, 255))

    # ── 1. Radial gradient background (indigo center, near-black edge) ──
    bg = Image.new("RGBA", (size, size), (10, 10, 20, 255))
    bdraw = ImageDraw.Draw(bg)
    cx, cy = size / 2, size / 2
    max_r = size / 2 * 1.5
    for r in range(int(max_r), 0, -1):
        t = r / max_r
        rgb = (
            int(40 * (1 - t) + 10 * t),
            int(40 * (1 - t) + 10 * t),
            int(95 * (1 - t) + 20 * t),
        )
        bdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*rgb, 255))

    # ── 2. Constellation accent dots ──
    random.seed(7)
    for _ in range(14):
        x = random.uniform(size * 0.08, size * 0.92)
        y = random.uniform(size * 0.08, size * 0.92)
        # avoid drawing right where the A will be (rough rectangle)
        if size * 0.22 < x < size * 0.78 and size * 0.18 < y < size * 0.84:
            continue
        rr = random.uniform(size * 0.006, size * 0.014)
        alpha = random.randint(120, 200)
        bdraw.ellipse([x - rr, y - rr, x + rr, y + rr],
                      fill=(180, 195, 255, alpha))

    # ── 3. Build the A as a mask ──
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    stroke = int(size * 0.11)
    # left + right strokes meeting at top center
    pts_left  = [(size * 0.26, size * 0.84), (size * 0.50, size * 0.16)]
    pts_right = [(size * 0.74, size * 0.84), (size * 0.50, size * 0.16)]
    mdraw.line(pts_left,  fill=255, width=stroke)
    mdraw.line(pts_right, fill=255, width=stroke)
    # crossbar
    mdraw.line([(size * 0.34, size * 0.59), (size * 0.66, size * 0.59)],
               fill=255, width=int(stroke * 0.85))
    # round endpoints with small circles for cleaner joins
    for (x, y) in (pts_left[0], pts_left[1], pts_right[0], pts_right[1]):
        rr = stroke / 2
        mdraw.ellipse([x - rr, y - rr, x + rr, y + rr], fill=255)

    # ── 4. Diagonal gradient fill (indigo top-left → cyan bottom-right) ──
    grad = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    diag = size * 1.4
    for i in range(int(diag)):
        t = i / diag
        # indigo #818cf8 -> cyan #22d3ee
        r = int(129 * (1 - t) + 34 * t)
        g = int(140 * (1 - t) + 211 * t)
        b = int(248 * (1 - t) + 238 * t)
        # diagonal stripe
        gd.line([(i, 0), (0, i)], fill=(r, g, b, 255))

    # apply A mask to gradient
    a_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    a_layer.paste(grad, (0, 0), mask)

    # ── 5. Glow halo around the A ──
    glow = a_layer.copy().filter(ImageFilter.GaussianBlur(size * 0.05))
    # boost glow brightness a bit
    glow_boost = Image.eval(glow, lambda v: min(255, int(v * 1.2)))

    # ── 6. Composite final ──
    bg.alpha_composite(glow_boost)
    bg.alpha_composite(a_layer)

    return bg


for size in (192, 512):
    img = make_icon(size)
    out = OUT / f"atlas-{size}.png"
    img.save(out, "PNG", optimize=True)
    print(f"  icons/atlas-{size}.png  ({out.stat().st_size // 1024} KB)")

fav = make_icon(64)
fav.save(OUT / "atlas-favicon.png", "PNG", optimize=True)
print("  icons/atlas-favicon.png")

# Also a higher-res mac icon
big = make_icon(1024)
big.save(OUT / "atlas-1024.png", "PNG", optimize=True)
print(f"  icons/atlas-1024.png  ({(OUT / 'atlas-1024.png').stat().st_size // 1024} KB)")

print("\nGenerated constellation-A icons.")
