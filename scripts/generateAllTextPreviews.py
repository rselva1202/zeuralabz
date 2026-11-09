import math
import random
import os
from PIL import Image, ImageDraw, ImageFont

width = 800
height = 450
cx = width // 2
cy = height // 2

text_components = [
    'split-text', 'typewriter', 'gradient-text', 'blur-text', 'scramble',
    'shiny', 'rotating-words', 'counter-roll', 'bounce-letters', 'fade-up',
    'glitch', 'neon-text', 'wave-text', 'reveal-text', 'marquee-text'
]

dir_mapping = {
    'split-text': ['split-text'],
    'typewriter': ['typewriter'],
    'gradient-text': ['gradient-text'],
    'blur-text': ['blur-text'],
    'scramble': ['scramble'],
    'shiny': ['shiny'],
    'rotating-words': ['rotating-words'],
    'counter-roll': ['counter-roll'],
    'bounce-letters': ['bounce-letters', 'underline-draw'],
    'fade-up': ['fade-up', 'word-swap'],
    'glitch': ['glitch', 'glitch-text'],
    'neon-text': ['neon-text', 'glow-headline'],
    'wave-text': ['wave-text', 'wave-motion'],
    'reveal-text': ['reveal-text', 'mask-reveal'],
    'marquee-text': ['marquee-text']
}

# Try to get system bold font
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

font_lg = get_font(48)
font_xl = get_font(56)
font_md = get_font(38)

def draw_text_frame(slug, frame_idx, total_frames):
    t = (frame_idx / total_frames) * math.pi * 2
    img = Image.new('RGB', (width, height), (10, 14, 39))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Deep navy backdrop with subtle cosmic vignette
    for r in range(int(max(width, height) * 0.45), 0, -8):
        op = int(25 * (1 - r / (max(width, height) * 0.45)))
        draw.ellipse([cx - int(r*1.5), cy - r, cx + int(r*1.5), cy + r], fill=(10 + op*2, 14 + op, 39 + op*3))

    if slug == 'split-text':
        chars = list("ZEURALABZ")
        spacing = 38
        start_x = cx - (len(chars) * spacing) // 2
        for i, c in enumerate(chars):
            phase = math.sin(t * 1.5 + i * 0.4)
            offset_y = -int(abs(phase) * 22)
            alpha = int(180 + abs(phase) * 75)
            x = start_x + i * spacing
            y = cy - 25 + offset_y
            draw.text((x+2, y+2), c, font=font_xl, fill=(168, 85, 247, 100))
            draw.text((x, y), c, font=font_xl, fill=(255, 255, 255, alpha))

    elif slug == 'typewriter':
        full = "Next-Gen UI Systems"
        chars_to_show = int(abs(math.sin(t)) * len(full)) + 1
        text_sub = full[:min(len(full), chars_to_show)]
        draw.text((cx - 240, cy - 25), text_sub, font=font_lg, fill=(56, 189, 248, 255))
        if int(t * 4) % 2 == 0:
            cursor_x = cx - 240 + len(text_sub) * 26
            draw.rectangle([cursor_x, cy - 22, cursor_x + 5, cy + 30], fill=(255, 255, 255, 255))

    elif slug == 'gradient-text':
        text_str = "Fluid Chromatic"
        colors = [(56, 189, 248), (129, 140, 248), (236, 72, 153), (254, 240, 138)]
        col_idx = int(t * 1.2) % len(colors)
        c1 = colors[col_idx]
        c2 = colors[(col_idx + 1) % len(colors)]
        draw.text((cx - 210, cy - 25), text_str, font=font_xl, fill=(c1[0], c1[1], c1[2], 255))
        draw.text((cx - 208, cy - 23), text_str, font=font_xl, fill=(c2[0], c2[1], c2[2], 120))

    elif slug == 'blur-text':
        text_str = "Crystalline Focus"
        blur_alpha = int(abs(math.sin(t)) * 200 + 55)
        for d in [4, 2]:
            draw.text((cx - 220 + d, cy - 25 + d), text_str, font=font_xl, fill=(129, 140, 248, 60))
            draw.text((cx - 220 - d, cy - 25 - d), text_str, font=font_xl, fill=(56, 189, 248, 60))
        draw.text((cx - 220, cy - 25), text_str, font=font_xl, fill=(255, 255, 255, blur_alpha))

    elif slug == 'scramble':
        text_str = "SYSTEM_OVERRIDE"
        glyphs = "!<>-_\\/[]{}—=+*^?#_101"
        scrambled = "".join([c if random.random() > 0.4 else random.choice(glyphs) for c in text_str])
        draw.text((cx - 230, cy - 25), scrambled, font=font_lg, fill=(52, 211, 153, 255))
        draw.text((cx - 228, cy - 23), scrambled, font=font_lg, fill=(34, 197, 94, 150))

    elif slug == 'shiny':
        text_str = "METALLIC SHEEN"
        draw.text((cx - 230, cy - 25), text_str, font=font_xl, fill=(203, 213, 225, 255))
        # Glint sweep bar
        sweep_x = int((frame_idx / total_frames) * (width + 200) - 100)
        draw.polygon([(sweep_x, cy - 40), (sweep_x + 50, cy - 40), (sweep_x - 30, cy + 40), (sweep_x - 80, cy + 40)], fill=(255, 255, 255, 120))

    elif slug == 'rotating-words':
        words = ["FUTURISTIC", "POWERFUL", "LIGHTNING", "ADAPTIVE"]
        w = words[int(t * 1.5) % len(words)]
        y_off = int(math.sin(t * 3) * 8)
        draw.text((cx - 180, cy - 25 + y_off), w, font=font_xl, fill=(168, 85, 247, 255))
        draw.text((cx - 178, cy - 23 + y_off), w, font=font_xl, fill=(236, 72, 153, 160))

    elif slug == 'counter-roll':
        val = int(abs(math.sin(t)) * 9840)
        s = f"+{val:,} ▲"
        draw.text((cx - 160, cy - 25), s, font=font_xl, fill=(52, 211, 153, 255))
        draw.text((cx - 158, cy - 23), s, font=font_xl, fill=(129, 140, 248, 120))

    elif slug == 'bounce-letters':
        chars = list("BOUNCING WAVE")
        spacing = 30
        start_x = cx - (len(chars) * spacing) // 2
        for i, c in enumerate(chars):
            y_jump = int(math.sin(t * 2.5 + i * 0.5) * 18)
            draw.text((start_x + i * spacing, cy - 25 + y_jump), c, font=font_lg, fill=(252, 211, 77, 255))

    elif slug == 'fade-up':
        text_str = "CINEMATIC SCALE"
        y_move = int((1 - abs(math.sin(t))) * 25)
        alpha = int(abs(math.sin(t)) * 200 + 55)
        draw.text((cx - 240, cy - 25 - y_move), text_str, font=font_xl, fill=(255, 255, 255, alpha))

    elif slug == 'glitch':
        text_str = "CYBER_ANOMALY"
        gx = int(math.sin(t * 4) * 5)
        draw.text((cx - 220 + gx, cy - 25), text_str, font=font_xl, fill=(6, 182, 212, 180))
        draw.text((cx - 220 - gx, cy - 25), text_str, font=font_xl, fill=(244, 63, 94, 180))
        draw.text((cx - 220, cy - 25), text_str, font=font_xl, fill=(255, 255, 255, 255))

    elif slug == 'neon-text':
        text_str = "ELECTRIC GLOW"
        for r in range(16, 0, -3):
            draw.text((cx - 230 + r, cy - 25), text_str, font=font_xl, fill=(56, 189, 248, 25))
            draw.text((cx - 230 - r, cy - 25), text_str, font=font_xl, fill=(129, 140, 248, 25))
        draw.text((cx - 230, cy - 25), text_str, font=font_xl, fill=(255, 255, 255, 255))

    elif slug == 'wave-text':
        chars = list("OCEANIC RHYTHM")
        spacing = 30
        start_x = cx - (len(chars) * spacing) // 2
        for i, c in enumerate(chars):
            y_wave = int(math.sin(t * 2 + i * 0.4) * 14)
            draw.text((start_x + i * spacing, cy - 25 + y_wave), c, font=font_lg, fill=(56, 189, 248, 255))

    elif slug == 'reveal-text':
        text_str = "UNVEILED BEAUTY"
        draw.text((cx - 220, cy - 25), text_str, font=font_xl, fill=(255, 255, 255, 255))
        # Mask curtain box
        bar_x = int((frame_idx / total_frames) * (width + 200) - 100)
        draw.rectangle([bar_x, cy - 35, bar_x + 90, cy + 35], fill=(236, 72, 153, 200))

    elif slug == 'marquee-text':
        text_str = "ZEURALABZ • DESIGN MATRIX • MOTION ARCHITECTURE • "
        off_x = int((frame_idx / total_frames) * 300)
        draw.text((cx - 400 - off_x, cy - 25), text_str + text_str, font=font_lg, fill=(168, 85, 247, 255))

    return img

print("Generating preview PNGs and animated GIFs for all 15 text animation components...")
for slug in text_components:
    frames = [draw_text_frame(slug, f, 12) for f in range(12)]
    png_frame = frames[0].resize((1200, 675), Image.LANCZOS)

    dirs = dir_mapping.get(slug, [slug])
    for d in dirs:
        comp_dir = os.path.join('components', 'text-animations', d)
        os.makedirs(comp_dir, exist_ok=True)

        png_path = os.path.join(comp_dir, 'preview.png')
        png_frame.save(png_path, 'PNG')

        gif_path = os.path.join(comp_dir, 'preview.gif')
        frames[0].save(gif_path, save_all=True, append_images=frames[1:], duration=140, loop=0, optimize=True)

    pub_dir = os.path.join('preview-site', 'public', 'previews')
    os.makedirs(pub_dir, exist_ok=True)
    for d in dirs:
        pub_png = os.path.join(pub_dir, f"{d}.png")
        pub_gif = os.path.join(pub_dir, f"{d}.gif")
        png_frame.save(pub_png, 'PNG')
        frames[0].save(pub_gif, save_all=True, append_images=frames[1:], duration=140, loop=0, optimize=True)

    print(f"Generated {slug} previews (PNG + GIF) for: {dirs}")

print("All 15 text animation previews generated successfully!")
