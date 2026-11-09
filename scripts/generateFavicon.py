import os
from PIL import Image, ImageDraw

def generate_favicons():
    public_dir = r"D:\MY PROJECTS\ZEURALABZ\preview-site\public"
    os.makedirs(public_dir, exist_ok=True)

    # 1. Generate SVG - Crimson Red #E11D48 with White "Z"
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Neo-Brutalist Crimson Red Background with Solid Border -->
  <rect x="3" y="3" width="58" height="58" fill="#E11D48" stroke="#FFFFFF" stroke-width="5" rx="0" />
  <!-- Bold Geometric "Z" Character in Pure White -->
  <polygon points="14,14 50,14 50,23 28,41 50,41 50,50 14,50 14,41 36,23 14,23" fill="#FFFFFF" />
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

    # Border thickness: 5 * scale
    b_width = 5 * scale
    draw.rectangle([3 * scale, 3 * scale, 61 * scale, 61 * scale], fill="#E11D48", outline="#FFFFFF", width=int(b_width))

    # Polygon coords scaled for white "Z"
    poly_points = [
        (14 * scale, 14 * scale),
        (50 * scale, 14 * scale),
        (50 * scale, 23 * scale),
        (28 * scale, 41 * scale),
        (50 * scale, 41 * scale),
        (50 * scale, 50 * scale),
        (14 * scale, 50 * scale),
        (14 * scale, 41 * scale),
        (36 * scale, 23 * scale),
        (14 * scale, 23 * scale)
    ]
    draw.polygon(poly_points, fill="#FFFFFF")

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

