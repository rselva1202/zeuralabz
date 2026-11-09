import os
from PIL import Image, ImageDraw

def generate_favicons():
    public_dir = r"D:\MY PROJECTS\ZEURALABZ\preview-site\public"
    os.makedirs(public_dir, exist_ok=True)

    # 1. Generate SVG
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Neo-Brutalist Yellow Background with Solid Black Border -->
  <rect x="3" y="3" width="58" height="58" fill="#FFDC58" stroke="#000000" stroke-width="6" rx="0" />
  <!-- Bold Geometric "Z" Character -->
  <polygon points="13,13 51,13 51,23 27,41 51,41 51,51 13,51 13,41 37,23 13,23" fill="#000000" />
</svg>'''

    svg_path = os.path.join(public_dir, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated {svg_path}")

    # Also save as logo.svg
    logo_svg_path = os.path.join(public_dir, "logo.svg")
    with open(logo_svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated {logo_svg_path}")

    # 2. Render High-Resolution Raster Image for ICO and PNG
    # Render at 512x512 with supersampling for crisp edges
    size = 512
    scale = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Border thickness: 6 * scale = 48
    # Outer box: x0=3*scale, y0=3*scale, x1=61*scale, y1=61*scale
    b_width = 6 * scale
    draw.rectangle([3 * scale, 3 * scale, 61 * scale, 61 * scale], fill="#FFDC58", outline="#000000", width=int(b_width))

    # Polygon coords scaled
    poly_points = [
        (13 * scale, 13 * scale),
        (51 * scale, 13 * scale),
        (51 * scale, 23 * scale),
        (27 * scale, 41 * scale),
        (51 * scale, 41 * scale),
        (51 * scale, 51 * scale),
        (13 * scale, 51 * scale),
        (13 * scale, 41 * scale),
        (37 * scale, 23 * scale),
        (13 * scale, 23 * scale)
    ]
    draw.polygon(poly_points, fill="#000000")

    # 3. Generate apple-touch-icon.png (180x180)
    apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon_path = os.path.join(public_dir, "apple-touch-icon.png")
    apple_icon.save(apple_icon_path, format="PNG")
    print(f"Generated {apple_icon_path}")

    # Also save as logo.png (180x180)
    logo_png_path = os.path.join(public_dir, "logo.png")
    apple_icon.save(logo_png_path, format="PNG")
    print(f"Generated {logo_png_path}")

    # 4. Generate favicon.ico (multi-resolution 16x16, 32x32, 48x48)
    ico_path = os.path.join(public_dir, "favicon.ico")
    img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated {ico_path}")

if __name__ == "__main__":
    generate_favicons()
