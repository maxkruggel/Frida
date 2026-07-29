#!/usr/bin/env python3
"""Baut aus den Bereichs-Screenshots einen Kontaktbogen auf einem Blatt."""
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFont

SHOTS = sys.argv[1] if len(sys.argv) > 1 else 'docs/screenshots'
OUT = os.path.join(SHOTS, 'kontaktbogen-alle-bereiche.png')

files = sorted(
    f for f in glob.glob(os.path.join(SHOTS, '*.png'))
    if 'kontaktbogen' not in f and 'b-' not in os.path.basename(f)[:4]
)

COLS, TW, TH, PAD, LABEL, MARGIN = 5, 300, 649, 26, 46, 34
rows = (len(files) + COLS - 1) // COLS
W = MARGIN * 2 + COLS * TW + (COLS - 1) * PAD
H = MARGIN * 2 + 90 + rows * (TH + LABEL + PAD)

sheet = Image.new('RGB', (W, H), '#F5EEDF')
draw = ImageDraw.Draw(sheet)

DJ = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
DJB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


def font(size, bold=False):
    path = DJB if bold else DJ
    return ImageFont.truetype(path, size) if os.path.exists(path) else ImageFont.load_default()


draw.text((MARGIN, MARGIN), 'Frida — alle Bereiche der App', font=font(44, True), fill='#453C31')
draw.text((MARGIN, MARGIN + 58), 'iPhone-Viewport 390 × 844 · Demo-Daten „Lena", Jan–Jul 2026',
          font=font(21), fill='#8A7E6D')

for i, path in enumerate(files):
    row, col = divmod(i, COLS)
    x = MARGIN + col * (TW + PAD)
    y = MARGIN + 90 + row * (TH + LABEL + PAD)
    sheet.paste(Image.open(path).convert('RGB').resize((TW, TH), Image.LANCZOS), (x, y))
    draw.rectangle([x - 1, y - 1, x + TW, y + TH], outline='#DDD2BC', width=2)
    num, _, rest = os.path.basename(path)[:-4].partition('-')
    draw.text((x, y + TH + 10), num, font=font(18, True), fill='#9C4F66')
    draw.text((x + 28, y + TH + 10), rest.replace('-', ' '), font=font(18), fill='#453C31')

sheet.save(OUT, optimize=True)
print(f'{OUT} — {len(files)} Bereiche, {sheet.size[0]}×{sheet.size[1]} px')
