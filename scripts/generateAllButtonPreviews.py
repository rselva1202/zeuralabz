import math
import random
import os
from PIL import Image, ImageDraw, ImageFont

width = 800
height = 450
cx = width // 2
cy = height // 2

button_components = [
    'gradient', 'neon', 'magnetic', 'shimmer', '3d',
    'outline-fill', 'loading', 'icon', 'social', 'glass-btn',
    'glow', 'pill', 'arrow', 'play', 'download'
]

dir_mapping = {
    'gradient': ['gradient'],
    'neon': ['neon'],
    'magnetic': ['magnetic'],
    'shimmer': ['shimmer'],
    '3d': ['3d'],
    'outline-fill': ['outline-fill'],
    'loading': ['loading'],
    'icon': ['icon', 'icon-morph'],
    'social': ['social', 'cyber-glitch'],
    'glass-btn': ['glass-btn'],
    'glow': ['glow', 'border-beam'],
    'pill': ['pill', 'ripple'],
    'arrow': ['arrow', 'swipe-arrow'],
    'play': ['play', 'confetti'],
    'download': ['download', 'copy-snippet']
}

# System font discovery
font_candidates = [
    "C:\\Windows\\Fonts\\arialbd.ttf",
    "C:\\Windows\\Fonts\\seguiwb.ttf",
    "C:\\Windows\\Fonts\\segoeuib.ttf",
    "C:\\Windows\\Fonts\\arial.ttf"
]
font_path = None
for f in font_candidates:
    if os.path.exists(f):
        font_path = f
        break

def get_font(size):
    if font_path:
        try:
            return ImageFont.truetype(font_path, size)
        except:
            return ImageFont.load_default()
    return ImageFont.load_default()

font_btn = get_font(26)
font_btn_bold = get_font(28)
font_sm = get_font(18)
font_badge = get_font(14)

def draw_button_frame(slug, frame_idx, total_frames):
    t = frame_idx / total_frames
    img = Image.new('RGB', (width, height), (10, 14, 39))
    draw = ImageDraw.Draw(img)

    # Ambient radial background lighting
    for r in range(160, 0, -20):
        alpha_val = int(35 * (1 - r / 160))
        draw.ellipse([cx - r*2.2, cy - r*1.3, cx + r*2.2, cy + r*1.3], fill=(18 + alpha_val, 24 + alpha_val, 75 + alpha_val*2))

    # Button dimensions
    bw, bh = 280, 68
    bx0, by0 = cx - bw // 2, cy - bh // 2
    bx1, by1 = cx + bw // 2, cy + bh // 2

    if slug == 'gradient':
        # Animated gradient border glow
        angle = t * 2 * math.pi
        gx_off = int(math.cos(angle) * 8)
        gy_off = int(math.sin(angle) * 8)
        # Outer glow
        draw.rounded_rectangle([bx0 - 4 + gx_off, by0 - 4 + gy_off, bx1 + 4 - gx_off, by1 + 4 - gy_off], radius=20, fill=(45, 80, 220))
        draw.rounded_rectangle([bx0 - 2, by0 - 2, bx1 + 2, by1 + 2], radius=18, fill=(160, 45, 230))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(18, 24, 60))
        # Text
        txt = "Iridescent Flow"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(235, 245, 255))

    elif slug == 'neon':
        # Cyberpunk emerald / cyan glow
        pulse = 0.5 + 0.5 * math.sin(t * 2 * math.pi)
        glow_size = int(6 + pulse * 6)
        # Halo
        draw.rounded_rectangle([bx0 - glow_size, by0 - glow_size, bx1 + glow_size, by1 + glow_size], radius=20, fill=(8, 55, 35))
        draw.rounded_rectangle([bx0 - 2, by0 - 2, bx1 + 2, by1 + 2], radius=16, fill=(52, 211, 153))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=14, fill=(4, 16, 10))
        # Text
        txt = "CYBER NEON"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(52, 211, 153))
        # Little pulsing dot
        draw.ellipse([cx - tw//2 - 24, cy - 6, cx - tw//2 - 12, cy + 6], fill=(52, 211, 153))

    elif slug == 'magnetic':
        # Cursor gravity offset
        angle = t * 2 * math.pi
        mx_off = int(math.sin(angle) * 16)
        my_off = int(math.cos(angle) * 10)
        nbx0, nby0 = bx0 + mx_off, by0 + my_off
        nbx1, nby1 = bx1 + mx_off, by1 + my_off
        # Shadow
        draw.rounded_rectangle([nbx0 - 4, nby0 + 8, nbx1 + 4, nby1 + 16], radius=20, fill=(25, 25, 80))
        draw.rounded_rectangle([nbx0, nby0, nbx1, nby1], radius=16, fill=(79, 70, 229))
        txt = "🧲 Cursor Gravity"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx + mx_off - tw//2, cy + my_off - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'shimmer':
        # Polished metallic surface + sweeping light beam
        draw.rounded_rectangle([bx0 - 2, by0 - 2, bx1 + 2, by1 + 2], radius=36, fill=(6, 182, 212))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=34, fill=(15, 20, 38))
        # Shimmer light beam sweep
        beam_x = int(bx0 - 40 + t * (bw + 80))
        draw.polygon([
            (beam_x - 30, by1), (beam_x + 10, by0),
            (beam_x + 35, by0), (beam_x - 5, by1)
        ], fill=(70, 160, 230))
        txt = "✧ Specular Shimmer ➔"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(240, 250, 255))

    elif slug == '3d':
        # Tactile mechanical press
        # If in second half of loop, animate press down
        press_down = 1 if (0.4 < t < 0.8) else 0
        y_offset = press_down * 6
        shadow_h = 8 - press_down * 5
        # 3D Bottom Ledge
        draw.rounded_rectangle([bx0, by0 + y_offset, bx1, by1 + y_offset + shadow_h], radius=16, fill=(49, 46, 129))
        # Button face
        draw.rounded_rectangle([bx0, by0 + y_offset, bx1, by1 + y_offset], radius=16, fill=(79, 70, 229))
        txt = "⚡ 3D TACTILE PUSH"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy + y_offset - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'outline-fill':
        # Border with fill sliding in
        fill_pct = 0.5 + 0.5 * math.sin(t * 2 * math.pi)
        fill_w = int(bw * fill_pct)
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, outline=(99, 102, 241), width=3)
        # Inside fill
        if fill_w > 0:
            draw.rounded_rectangle([bx0 + 2, by0 + 2, bx0 + fill_w, by1 - 2], radius=14, fill=(79, 70, 229))
        txt = "Prism Sweep ↗"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'loading':
        # Spinner rotating
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(37, 99, 235))
        # Animated spinner
        spin_ang = t * 2 * math.pi
        sx, sy = cx - 80, cy
        draw.arc([sx - 12, sy - 12, sx + 12, sy + 12], start=math.degrees(spin_ang), end=math.degrees(spin_ang + 4.5), fill=(255, 255, 255), width=3)
        txt = "Synthesizing..."
        bbox = font_btn_bold.getbbox(txt)
        th = bbox[3] - bbox[1]
        draw.text((cx - 50, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'icon':
        # Icon with rotation micro-interaction
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(234, 88, 12))
        spark_ang = math.sin(t * 2 * math.pi) * 0.3
        txt = "✦ Creative Spark"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'social':
        # Developer GitHub badge
        draw.rounded_rectangle([bx0 - 1, by0 - 1, bx1 + 1, by1 + 1], radius=16, fill=(55, 65, 81))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=15, fill=(22, 27, 34))
        txt = "★ GitHub Star"
        bbox = font_btn.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - 45 - tw//2, cy - th//2 - 2), txt, font=font_btn, fill=(255, 255, 255))
        # Badge
        draw.rounded_rectangle([cx + 45, cy - 14, cx + 115, cy + 14], radius=10, fill=(33, 38, 45), outline=(55, 65, 81), width=1)
        draw.text((cx + 55, cy - 9), "★ 1.4k", font=font_badge, fill=(253, 224, 71))

    elif slug == 'glass-btn':
        # Frosted glassmorphism
        draw.rounded_rectangle([bx0 - 2, by0 - 2, bx1 + 2, by1 + 2], radius=22, fill=(60, 70, 110))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=20, fill=(28, 36, 68))
        # Inner specular reflection
        draw.rounded_rectangle([bx0 + 6, by0 + 4, bx1 - 6, by0 + 20], radius=10, fill=(45, 55, 95))
        txt = "✦ Liquid Glass"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'glow':
        # Ambient diffused backlighting
        pulse = 0.5 + 0.5 * math.sin(t * 2 * math.pi)
        glow_r = int(20 + pulse * 15)
        draw.rounded_rectangle([bx0 - glow_r, by0 - glow_r, bx1 + glow_r, by1 + glow_r], radius=30, fill=(20, 50, 120))
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(12, 16, 36), outline=(6, 182, 212), width=2)
        txt = "Ambient Radiant Glow"
        bbox = font_btn.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn, fill=(220, 245, 255))

    elif slug == 'pill':
        # Sleek ergonomic capsule
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=34, fill=(124, 58, 237), outline=(167, 139, 250), width=2)
        txt = "Sleek Capsule ●"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'arrow':
        # Kinetic arrow gliding forward
        arr_off = int((0.5 + 0.5 * math.sin(t * 2 * math.pi)) * 14)
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(79, 70, 229))
        txt = "Launch Matrix"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - 20 - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))
        draw.text((cx + tw//2 - 10 + arr_off, cy - th//2 - 2), "➔", font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'play':
        # Ripple rings expanding
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=34, fill=(16, 185, 129), outline=(110, 231, 183), width=2)
        # Ripple ring
        rip_r = int(t * 25)
        if rip_r > 0:
            draw.rounded_rectangle([bx0 - rip_r, by0 - rip_r, bx1 + rip_r, by1 + rip_r], radius=34 + rip_r, outline=(16, 185, 129), width=2)
        txt = "▶ Play Video"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    elif slug == 'download':
        # Action download with arrow animation
        down_off = int((t * 12) % 12)
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(2, 132, 199))
        txt = "↓ Download Asset"
        bbox = font_btn_bold.getbbox(txt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((cx - tw//2, cy - th//2 - 2), txt, font=font_btn_bold, fill=(255, 255, 255))

    return img

print("Generating PNG and animated GIF previews for all 15 buttons...")

for slug in button_components:
    # 1. Generate PNG (static frame at t=0.3)
    png_img = draw_button_frame(slug, 3, 10)

    # 2. Generate Animated GIF (10 frames)
    gif_frames = [draw_button_frame(slug, i, 10) for i in range(10)]

    # Target folders
    target_dirs = dir_mapping.get(slug, [slug])
    for d in target_dirs:
        comp_dir = os.path.join('components', 'buttons', d)
        if os.path.exists(comp_dir):
            png_img.save(os.path.join(comp_dir, 'preview.png'))
            gif_frames[0].save(
                os.path.join(comp_dir, 'preview.gif'),
                save_all=True,
                append_images=gif_frames[1:],
                duration=100,
                loop=0
            )

    # Preview-site public/previews/
    public_previews = os.path.join('preview-site', 'public', 'previews')
    if os.path.exists(public_previews):
        png_img.save(os.path.join(public_previews, f'{slug}.png'))
        gif_frames[0].save(
            os.path.join(public_previews, f'{slug}.gif'),
            save_all=True,
            append_images=gif_frames[1:],
            duration=100,
            loop=0
        )
        for d in target_dirs:
            if d != slug:
                png_img.save(os.path.join(public_previews, f'{d}.png'))
                gif_frames[0].save(
                    os.path.join(public_previews, f'{d}.gif'),
                    save_all=True,
                    append_images=gif_frames[1:],
                    duration=100,
                    loop=0
                )

print("Successfully generated all button previews (PNG + GIF)!")
