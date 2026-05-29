"""Generate Atlas PWA icons (192/512 PNG + 32 favicon).

Run with quant's venv (Pillow installed there):
    C:\\Users\\HOME\\quant\\.venv\\Scripts\\python.exe generate_icons.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

OUT = Path(__file__).resolve().parent

def make_icon(size: int, with_padding=True):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # Radial gradient background — indigo center to near-black edge
    bg = Image.new("RGBA", (size, size), (10, 10, 20, 255))
    bdraw = ImageDraw.Draw(bg)
    cx, cy = size / 2, size / 2
    max_r = size / 2 * 1.4
    for r in range(int(max_r), 0, -1):
        t = r / max_r
        rgb = (
            int(33 * (1 - t) + 10 * t),
            int(33 * (1 - t) + 10 * t),
            int(77 * (1 - t) + 20 * t),
        )
        bdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*rgb, 255))

    # Soft glow disc
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    pad = size * 0.20
    gdraw.ellipse([pad, pad, size - pad, size - pad], fill=(129, 140, 248, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(size / 10))
    bg.alpha_composite(glow)

    # Centered "A" in white
    font_path = None
    for candidate in ("arialbd.ttf", "Arial Bold.ttf", "calibrib.ttf", "segoeuib.ttf"):
        try:
            ImageFont.truetype(candidate, 10)
            font_path = candidate; break
        except Exception:
            continue
    font_size = int(size * 0.58)
    try:
        font = ImageFont.truetype(font_path or "arial.ttf", font_size)
    except Exception:
        font = ImageFont.load_default()
    draw = ImageDraw.Draw(bg)
    text = "A"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    # Slight upward bias because "A" has visual weight below center
    tx = (size - tw) / 2 - bbox[0]
    ty = (size - th) / 2 - bbox[1] - size * 0.02
    draw.text((tx, ty), text, font=font, fill=(232, 232, 240, 255))

    img.alpha_composite(bg)
    return img


for size in (192, 512):
    img = make_icon(size)
    out_path = OUT / f"atlas-{size}.png"
    img.save(out_path, "PNG", optimize=True)
    print(f"  {out_path.relative_to(OUT.parent)}  ({out_path.stat().st_size // 1024} KB)")

# Tiny favicon
fav = make_icon(64)
fav.save(OUT / "atlas-favicon.png", "PNG", optimize=True)
print(f"  icons/atlas-favicon.png")

print("\nGenerated 3 icons in atlas/icons/")
