#!/usr/bin/env python3
"""Sample median colours from named patches of the captured shop photos,
and cut zoom crops for typeface identification."""
from PIL import Image
import os, statistics

HERE = os.path.dirname(os.path.abspath(__file__))

# (image, patch-name, (x0, y0, x1, y1))
PATCHES = [
    ("clean-01-shopfront.jpeg", "green-fascia-lit",   (250, 170, 1050, 300)),
    ("clean-01-shopfront.jpeg", "green-lower-panel",  (480, 820, 620, 940)),
    ("clean-01-shopfront.jpeg", "curtain-white",      (200, 620, 400, 840)),
    ("clean-02-side.jpeg",      "green-shade",        (150, 250, 600, 380)),
    ("clean-03-flatwhites-coaster.jpeg", "coaster-red", (265, 485, 345, 545)),
    ("clean-03-flatwhites-coaster.jpeg", "table-wood",  (40, 60, 560, 190)),
    ("clean-06-interior.jpeg",  "wall-panelling",     (600, 300, 760, 600)),
    ("clean-06-interior.jpeg",  "floor-dark",         (200, 900, 600, 1020)),
    ("clean-04-hotchoc-cake.jpeg", "plate-cream",     (100, 720, 220, 800)),
    ("clean-07-table-machine.jpeg", "cup-white",      (250, 800, 400, 880)),
]

# (image, crop-name, box, upscale)
ZOOMS = [
    ("clean-01-shopfront.jpeg", "zoom-signage.png", (980, 630, 1300, 780), 3),
    ("clean-01-shopfront.jpeg", "zoom-signage-left.png", (30, 630, 350, 780), 3),
    ("clean-03-flatwhites-coaster.jpeg", "zoom-coaster.png", (225, 445, 395, 595), 3),
    ("clean-01-shopfront.jpeg", "zoom-door.png", (560, 380, 800, 1000), 2),
]

def median_hex(img, box):
    region = img.crop(box).convert("RGB")
    px = list(region.getdata())
    med = tuple(int(statistics.median(c[i] for c in px)) for i in range(3))
    return "#%02x%02x%02x" % med, med

swatches = []
for fname, name, box in PATCHES:
    img = Image.open(os.path.join(HERE, fname))
    hexv, rgb = median_hex(img, box)
    print(f"{name:20s} {hexv}  rgb{rgb}  <- {fname} {box}")
    sw = img.crop(box).convert("RGB")
    sw.thumbnail((160, 160))
    swatches.append((name, hexv, sw))

# contact sheet of patches so targeting can be verified visually
sheet_h = 90
sheet = Image.new("RGB", (len(swatches) * 170, sheet_h + 70), (250, 250, 250))
from PIL import ImageDraw
d = ImageDraw.Draw(sheet)
for i, (name, hexv, sw) in enumerate(swatches):
    x = i * 170 + 5
    sw2 = sw.resize((160, sheet_h))
    sheet.paste(sw2, (x, 5))
    d.rectangle((x, sheet_h + 12, x + 160, sheet_h + 40), fill=hexv)
    d.text((x + 2, sheet_h + 44), f"{name[:20]}\n{hexv}", fill=(20, 20, 20))
sheet.save(os.path.join(HERE, "patch-sheet.png"))
print("saved patch-sheet.png")

for fname, out, box, scale in ZOOMS:
    img = Image.open(os.path.join(HERE, fname))
    crop = img.crop(box)
    crop = crop.resize((crop.width * scale, crop.height * scale), Image.LANCZOS)
    crop.save(os.path.join(HERE, out))
    print(f"saved {out} ({crop.width}x{crop.height})")
