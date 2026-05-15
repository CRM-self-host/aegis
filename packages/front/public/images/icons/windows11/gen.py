#!/usr/bin/env python3
import pyvips
import os

REF = "ref.png"

src = pyvips.Image.new_from_file(REF)

# luminance-based alpha: preserves glow falloff at edges
lum = src.colourspace("grey16")          # 0–65535
alpha = (lum / 65535 * 255).cast("uchar")
src = src.bandjoin(alpha)                # RGBA, black→transparent, glow→semiif src.bands == 3:

def square(w, h, name):
    img = src.thumbnail_image(w, height=h, crop="centre")
    img.write_to_file(name)

def letterbox(w, h, name):
    scale = min(w / src.width, h / src.height)
    tw = round(src.width * scale)
    th = round(src.height * scale)
    thumb = src.thumbnail_image(tw, height=th)
    canvas = pyvips.Image.black(w, h, bands=4).copy(interpretation="srgb")
    canvas = canvas.draw_image(thumb, (w - tw) // 2, (h - th) // 2)
    canvas.write_to_file(name)

square_targets = [
    (310, 310, "LargeTile.scale-100.png"),
    (388, 388, "LargeTile.scale-125.png"),
    (465, 465, "LargeTile.scale-150.png"),
    (620, 620, "LargeTile.scale-200.png"),
    (1240, 1240, "LargeTile.scale-400.png"),
    (71, 71,   "SmallTile.scale-100.png"),
    (89, 89,   "SmallTile.scale-125.png"),
    (107, 107, "SmallTile.scale-150.png"),
    (142, 142, "SmallTile.scale-200.png"),
    (284, 284, "SmallTile.scale-400.png"),
    (150, 150, "Square150x150Logo.scale-100.png"),
    (188, 188, "Square150x150Logo.scale-125.png"),
    (225, 225, "Square150x150Logo.scale-150.png"),
    (300, 300, "Square150x150Logo.scale-200.png"),
    (600, 600, "Square150x150Logo.scale-400.png"),
    (44, 44,   "Square44x44Logo.scale-100.png"),
    (55, 55,   "Square44x44Logo.scale-125.png"),
    (66, 66,   "Square44x44Logo.scale-150.png"),
    (88, 88,   "Square44x44Logo.scale-200.png"),
    (176, 176, "Square44x44Logo.scale-400.png"),
    (50, 50,   "StoreLogo.scale-100.png"),
    (63, 63,   "StoreLogo.scale-125.png"),
    (75, 75,   "StoreLogo.scale-150.png"),
    (100, 100, "StoreLogo.scale-200.png"),
    (200, 200, "StoreLogo.scale-400.png"),
]

for s in [16,20,24,256,30,32,36,40,44,48,60,64,72,80,96]:
    for prefix in [
        "Square44x44Logo.targetsize",
        "Square44x44Logo.altform-unplated_targetsize",
        "Square44x44Logo.altform-lightunplated_targetsize",
    ]:
        square_targets.append((s, s, f"{prefix}-{s}.png"))

letterbox_targets = [
    (310, 150,  "Wide310x150Logo.scale-100.png"),
    (388, 188,  "Wide310x150Logo.scale-125.png"),
    (465, 225,  "Wide310x150Logo.scale-150.png"),
    (620, 300,  "Wide310x150Logo.scale-200.png"),
    (1240, 600, "Wide310x150Logo.scale-400.png"),
    (620, 300,  "SplashScreen.scale-100.png"),
    (775, 375,  "SplashScreen.scale-125.png"),
    (930, 450,  "SplashScreen.scale-150.png"),
    (1240, 600, "SplashScreen.scale-200.png"),
    (2480, 1200,"SplashScreen.scale-400.png"),
]

for w, h, name in square_targets:
    square(w, h, name)
    print(f"sq  {w}x{h} -> {name}")

for w, h, name in letterbox_targets:
    letterbox(w, h, name)
    print(f"lb  {w}x{h} -> {name}")

print("done")
