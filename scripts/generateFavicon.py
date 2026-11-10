import os
from PIL import Image, ImageDraw, ImageFont

def generate_assets():
    public_dir = os.path.abspath(r"D:\MY PROJECTS\ZEURALABZ\preview-site\public")
    os.makedirs(public_dir, exist_ok=True)
    
    # 1. Generate SVG - Pure Minimal Neo-Brutalist Mint Square with Black Z and 2px White Border
    # Mint: #2DD4BF, Black: #000000, Border: #FFFFFF
    # viewBox: 0 0 64 64, Z fills ~70% of square
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Minimal Neo-Brutalist Mint #2DD4BF Square with 2px White Border -->
  <rect x="1" y="1" width="62" height="62" fill="#2DD4BF" stroke="#FFFFFF" stroke-width="2" />
  <!-- Bold Geometric "Z" Character in Pure Black (#000000) -->
  <polygon points="12,12 52,12 52,22 28,42 52,42 52,52 12,52 12,42 36,22 12,22" fill="#000000" />
</svg>'''
    
    with open(os.path.join(public_dir, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    with open(os.path.join(public_dir, "logo.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Created favicon.svg and logo.svg (Mint #2DD4BF + Black Z)")

    # 2. Helper to draw raster Z
    def create_raster_z(size):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Border thickness scaled
        bw = max(2, int(size * (2 / 64)))
        
        # Mint background square
        draw.rectangle([0, 0, size - 1, size - 1], fill="#2DD4BF")
        
        # White border
        draw.rectangle([0, 0, size - 1, size - 1], outline="#FFFFFF", width=bw)
        
        # Black Z polygon scaled
        scale = size / 64.0
        points = [
            (12 * scale, 12 * scale),
            (52 * scale, 12 * scale),
            (52 * scale, 22 * scale),
            (28 * scale, 42 * scale),
            (52 * scale, 42 * scale),
            (52 * scale, 52 * scale),
            (12 * scale, 52 * scale),
            (12 * scale, 42 * scale),
            (36 * scale, 22 * scale),
            (12 * scale, 22 * scale)
        ]
        draw.polygon(points, fill="#000000")
        return img

    # Apple Touch Icon (180x180)
    icon_180 = create_raster_z(180)
    icon_180.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    print("Created apple-touch-icon.png (180x180)")

    # Logo (512x512)
    logo_512 = create_raster_z(512)
    logo_512.save(os.path.join(public_dir, "logo.png"), "PNG")
    print("Created logo.png (512x512)")

    # Favicon.ico with 16x16, 32x32, 48x48
    ico_16 = create_raster_z(16)
    ico_32 = create_raster_z(32)
    ico_48 = create_raster_z(48)
    ico_48.save(
        os.path.join(public_dir, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Created favicon.ico (multi-res 16, 32, 48)")

if __name__ == "__main__":
    generate_assets()
