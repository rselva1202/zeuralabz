import math
import random
import os
import shutil
from PIL import Image, ImageDraw

width = 800
height = 450
cx = width // 2
cy = height // 2

backgrounds = [
    'aurora', 'galaxy', 'particles', 'dots', 'starfield',
    'liquid', 'grid', 'mesh', 'noise', 'beam',
    'hexagon', 'waves', 'gradient', 'nebula', 'fireflies'
]

dir_mapping = {
    'aurora': ['aurora'],
    'galaxy': ['galaxy'],
    'particles': ['particles'],
    'dots': ['dots'],
    'starfield': ['starfield'],
    'liquid': ['liquid'],
    'grid': ['grid'],
    'mesh': ['mesh', 'circuit'],
    'noise': ['noise'],
    'beam': ['beam'],
    'hexagon': ['hexagon', 'hex-mesh'],
    'waves': ['waves', 'lines'],
    'gradient': ['gradient'],
    'nebula': ['nebula', 'clouds'],
    'fireflies': ['fireflies', 'vignette']
}

def draw_frame(bg_type, frame_idx, total_frames):
    t = (frame_idx / total_frames) * math.pi * 2
    img = Image.new('RGB', (width, height), (10, 14, 39))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Ambient deep navy cosmic vignette
    for r in range(int(max(width, height) * 0.45), 0, -8):
        op = int(25 * (1 - r / (max(width, height) * 0.45)))
        draw.ellipse([cx - int(r*1.5), cy - r, cx + int(r*1.5), cy + r], fill=(10 + op*2, 14 + op, 39 + op*3))

    if bg_type == 'galaxy':
        max_r = min(width, height) * 0.46
        # Core bloom
        for r in range(50, 0, -5):
            alpha = int(60 * (1 - r / 50))
            draw.ellipse([cx - r, cy - int(r*0.76), cx + r, cy + int(r*0.76)], fill=(168, 85, 247, alpha))
        for r in range(20, 0, -2):
            alpha = int(100 * (1 - r / 20))
            draw.ellipse([cx - r, cy - int(r*0.76), cx + r, cy + int(r*0.76)], fill=(255, 255, 255, alpha))

        random.seed(42)
        colors = [(255,255,255), (254,240,138), (56,189,248), (129,140,248), (192,132,252), (244,114,182)]
        for i in range(750):
            r_type = random.random()
            arm = random.randint(0, 2)
            if r_type < 0.25:
                r_ratio = (random.random()**2.2) * 0.18
                ang_scat = (random.random() - 0.5) * math.pi * 2
                sz = random.uniform(1.2, 2.4)
                col = (255,255,255) if random.random() < 0.5 else (254,240,138)
                al = int(random.uniform(160, 255))
            else:
                r_ratio = 0.12 + (random.random()**0.95) * 0.88
                ang_scat = (random.random() + random.random() - 1) * (0.28 * (r_ratio + 0.25))
                sz = random.uniform(0.8, 1.8)
                col = colors[random.randint(0, len(colors)-1)]
                al = int(random.uniform(120, 230))
            ang = arm * (math.pi * 2 / 3) + t * (1.0 / math.sqrt(r_ratio*4 + 0.4)) * 0.5 + ang_scat + (r_ratio**0.72) * 3.6
            eff_r = r_ratio * max_r
            x = cx + math.cos(ang) * eff_r
            y = cy + math.sin(ang) * (eff_r * 0.76)
            draw.ellipse([x - sz, y - sz, x + sz, y + sz], fill=(col[0], col[1], col[2], al))

    elif bg_type == 'aurora':
        palette = [(6,182,212), (99,102,241), (168,85,247), (236,72,153), (16,185,129)]
        for l in range(4):
            c1 = palette[l % len(palette)]
            y_base = height * (0.35 + l * 0.12)
            points = [(0, height)]
            for x in range(0, width + 20, 20):
                w1 = math.sin(x * 0.006 + t * (1.0 + l * 0.3) + l) * 50
                w2 = math.cos(x * 0.014 - t * 0.8 + l*2) * 25
                points.append((x, y_base + w1 + w2))
            points.append((width, height))
            draw.polygon(points, fill=(c1[0], c1[1], c1[2], 55))

    elif bg_type == 'particles' or bg_type == 'mesh':
        random.seed(99)
        nodes = []
        for i in range(50):
            nx = (random.random() + math.sin(t + i) * 0.05) % 1.0 * width
            ny = (random.random() + math.cos(t * 0.8 + i) * 0.05) % 1.0 * height
            nodes.append((nx, ny))
            draw.ellipse([nx-2.5, ny-2.5, nx+2.5, ny+2.5], fill=(56, 189, 248, 220))
        for i in range(len(nodes)):
            for j in range(i+1, len(nodes)):
                dx = nodes[i][0] - nodes[j][0]
                dy = nodes[i][1] - nodes[j][1]
                dist = math.hypot(dx, dy)
                if dist < 120:
                    alpha = int((1 - dist / 120) * 120)
                    draw.line([nodes[i], nodes[j]], fill=(129, 140, 248, alpha), width=1)

    elif bg_type == 'dots':
        spacing = 28
        for x in range(14, width, spacing):
            for y in range(14, height, spacing):
                dist = math.hypot(x - cx, y - cy)
                ripple = math.sin(dist * 0.035 - t * 2.5) * 0.5 + 0.5
                sz = 1.0 + ripple * 2.5
                alpha = int(40 + ripple * 180)
                draw.ellipse([x-sz, y-sz, x+sz, y+sz], fill=(56, 189, 248, alpha))

    elif bg_type == 'starfield':
        random.seed(123)
        for i in range(450):
            sx = (random.random() * width + t * 15 * ((i % 3) + 1)) % width
            sy = random.random() * height
            tw = math.sin(t * 3 + i) * 0.5 + 0.5
            sz = 0.8 + tw * 1.5
            draw.ellipse([sx-sz, sy-sz, sx+sz, sy+sz], fill=(255, 255, 255, int(80 + tw * 175)))

    elif bg_type == 'liquid':
        for b in range(5):
            ang = t * 0.9 + b * (math.pi * 2 / 5)
            bx = cx + math.cos(ang * 0.7) * (width * 0.28)
            by = cy + math.sin(ang * 0.9) * (height * 0.24)
            for r in range(90, 0, -6):
                alpha = int(45 * (1 - r / 90))
                col = (236, 72, 153) if b % 2 == 0 else (139, 92, 246)
                draw.ellipse([bx-r, by-r, bx+r, by+r], fill=(col[0], col[1], col[2], alpha))

    elif bg_type == 'grid':
        horizon = int(height * 0.44)
        for r in range(60, 0, -4):
            alpha = int(50 * (1 - r / 60))
            draw.rectangle([0, horizon - r, width, horizon + r], fill=(99, 102, 241, alpha))
        for i in range(-14, 15):
            xb = cx + i * 55
            draw.line([(cx + i*6, horizon), (xb, height)], fill=(6, 182, 212, 90), width=1)
        grid_off = (t * 30) % 25
        for h in range(12):
            prog = (h / 12) ** 2.2
            y = horizon + prog * (height - horizon) + grid_off * prog
            if y < height:
                draw.line([(0, int(y)), (width, int(y))], fill=(99, 102, 241, 100), width=1)

    elif bg_type == 'noise':
        for r in range(int(max(width, height) * 0.5), 0, -12):
            draw.ellipse([cx - r*1.3, cy - r, cx + r*1.3, cy + r], fill=(99, 102, 241, 20))
        random.seed(int(t * 10))
        for _ in range(8000):
            rx = random.randint(0, width - 1)
            ry = random.randint(0, height - 1)
            draw.point([rx, ry], fill=(168, 85, 247, 60))

    elif bg_type == 'beam':
        ang = t * 1.5
        rx = cx + math.cos(ang) * (width * 0.44)
        ry = cy + math.sin(ang) * (height * 0.42)
        for r in range(100, 0, -8):
            alpha = int(70 * (1 - r / 100))
            draw.ellipse([rx-r, ry-r, rx+r, ry+r], fill=(56, 189, 248, alpha))
        draw.rectangle([20, 20, width-20, height-20], outline=(99, 102, 241, 180), width=3)

    elif bg_type == 'hexagon':
        hex_sz = 32
        hex_h = hex_sz * math.sqrt(3)
        cols = int(width / (hex_sz * 1.5)) + 2
        rows = int(height / hex_h) + 2
        for r in range(rows):
            for c in range(cols):
                hx = c * hex_sz * 1.5
                hy = r * hex_h + (hex_h / 2 if c % 2 == 1 else 0)
                dist = math.hypot(hx - cx, hy - cy)
                wave = math.sin(dist * 0.035 - t * 2.5)
                if wave > 0.1:
                    pts = []
                    for a in range(6):
                        angle = (math.pi / 3) * a
                        pts.append((hx + math.cos(angle) * (hex_sz-2), hy + math.sin(angle) * (hex_sz-2)))
                    alpha = int(40 + wave * 160)
                    draw.polygon(pts, outline=(56, 189, 248, alpha))

    elif bg_type == 'waves':
        for w in range(5):
            yc = cy + (w - 2) * 28
            col = [(6,182,212), (59,130,246), (139,92,246), (236,72,153), (16,185,129)][w]
            pts = []
            for x in range(0, width + 10, 10):
                y = yc + math.sin(x * 0.008 + t * (1.2 + w * 0.4) + w * 1.5) * (35 + w * 8)
                pts.append((x, int(y)))
            draw.line(pts, fill=(col[0], col[1], col[2], 160), width=2)

    elif bg_type == 'gradient':
        for i in range(4):
            gx = cx + math.sin(t * 0.8 + i * math.pi / 2) * (width * 0.3)
            gy = cy + math.cos(t * 0.8 + i * math.pi / 2) * (height * 0.25)
            col = [(49,46,129), (124,58,237), (14,116,144), (236,72,153)][i]
            for r in range(160, 0, -12):
                alpha = int(60 * (1 - r / 160))
                draw.ellipse([gx-r, gy-r, gx+r, gy+r], fill=(col[0], col[1], col[2], alpha))

    elif bg_type == 'nebula':
        for i in range(5):
            nx = cx + math.sin(t * 0.4 + i * 1.4) * (width * 0.25)
            ny = cy + math.cos(t * 0.5 + i * 1.2) * (height * 0.22)
            col = [(192,132,252), (244,114,182), (56,189,248), (129,140,248), (254,240,138)][i]
            for r in range(140, 0, -10):
                alpha = int(45 * (1 - r / 140))
                draw.ellipse([nx-r*1.3, ny-r, nx+r*1.3, ny+r], fill=(col[0], col[1], col[2], alpha))

    elif bg_type == 'fireflies':
        random.seed(77)
        for i in range(90):
            fx = (random.random() * width + math.sin(t * 2 + i) * 20) % width
            fy = (random.random() * height + math.cos(t * 2 + i) * 20) % height
            pw = math.sin(t * 3 + i) * 0.5 + 0.5
            sz = 2.0 + pw * 3.0
            col = (254, 240, 138) if i % 2 == 0 else (34, 197, 94)
            for r in range(int(sz * 4), 0, -3):
                draw.ellipse([fx-r, fy-r, fx+r, fy+r], fill=(col[0], col[1], col[2], int(40 * (1 - r / (sz*4)))))
            draw.ellipse([fx-sz, fy-sz, fx+sz, fy+sz], fill=(255, 255, 255, 240))

    return img

print("Generating preview PNGs and animated GIFs for all 15 background components...")
for bg in backgrounds:
    frames = [draw_frame(bg, f, 12) for f in range(12)]
    
    # Save preview.png (high quality first frame)
    png_frame = frames[0].resize((1200, 675), Image.LANCZOS)
    
    dirs = dir_mapping.get(bg, [bg])
    for d in dirs:
        comp_dir = os.path.join('components', 'backgrounds', d)
        os.makedirs(comp_dir, exist_ok=True)
        
        # Save PNG
        png_path = os.path.join(comp_dir, 'preview.png')
        png_frame.save(png_path, 'PNG')
        
        # Save GIF
        gif_path = os.path.join(comp_dir, 'preview.gif')
        frames[0].save(gif_path, save_all=True, append_images=frames[1:], duration=140, loop=0, optimize=True)

    # Also save to preview-site/public/previews/
    pub_dir = os.path.join('preview-site', 'public', 'previews')
    os.makedirs(pub_dir, exist_ok=True)
    
    for d in dirs:
        pub_png = os.path.join(pub_dir, f"{d}.png")
        pub_gif = os.path.join(pub_dir, f"{d}.gif")
        png_frame.save(pub_png, 'PNG')
        frames[0].save(pub_gif, save_all=True, append_images=frames[1:], duration=140, loop=0, optimize=True)

    print(f"Generated {bg} previews (PNG + GIF) for dirs: {dirs}")

print("All 15 background previews generated successfully!")

