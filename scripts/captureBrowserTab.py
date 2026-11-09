import os
from PIL import Image, ImageDraw, ImageFont

def render_browser_tab_screenshot():
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
    public_dir = r"D:\MY PROJECTS\ZEURALABZ\preview-site\public"
    
    # 1. Load the generated favicon icon (32x32)
    fav_icon_path = os.path.join(public_dir, "apple-touch-icon.png")
    fav_icon = Image.open(fav_icon_path).convert("RGBA").resize((20, 20), Image.Resampling.LANCZOS)
    
    # 2. Create Browser Chrome Header (Width: 1000px, Height: 90px)
    width = 1000
    height = 92
    img = Image.new("RGBA", (width, height), "#1C1C1C")
    draw = ImageDraw.Draw(img)
    
    # Tab Row (Height 44px)
    # Window controls (mac-style dots for aesthetic clarity)
    draw.ellipse([14, 16, 26, 28], fill="#FF5F56")
    draw.ellipse([34, 16, 46, 28], fill="#FFBD2E")
    draw.ellipse([54, 16, 66, 28], fill="#27C93F")
    
    # Active Tab Shape
    tab_x0 = 80
    tab_w = 340
    tab_y0 = 8
    tab_y1 = 44
    draw.rectangle([tab_x0, tab_y0, tab_x0 + tab_w, tab_y1], fill="#2B2B2B")
    
    # Paste the yellow Z favicon inside the active tab
    img.paste(fav_icon, (tab_x0 + 12, tab_y0 + 8), fav_icon)
    
    # Try to load a clean font or fallback
    try:
        font = ImageFont.truetype("arial.ttf", 12)
        url_font = ImageFont.truetype("arial.ttf", 13)
        bold_font = ImageFont.truetype("arialbd.ttf", 12)
    except:
        font = ImageFont.load_default()
        url_font = ImageFont.load_default()
        bold_font = ImageFont.load_default()
        
    # Tab Title
    title = "ZEURALABZ — Bold Neo-Brutalist UI Library for Modern React"
    draw.text((tab_x0 + 38, tab_y0 + 11), title[:42] + "...", fill="#FFFFFF", font=bold_font)
    
    # Tab Close "x"
    draw.text((tab_x0 + tab_w - 20, tab_y0 + 11), "✕", fill="#888888", font=font)
    
    # Address Bar Row (Height 48px)
    draw.rectangle([0, 44, width, height], fill="#2B2B2B")
    
    # Navigation Buttons (< > ⟳)
    draw.text((20, 58), "◀", fill="#888888", font=font)
    draw.text((45, 58), "▶", fill="#888888", font=font)
    draw.text((70, 58), "⟳", fill="#CCCCCC", font=font)
    
    # Address Input Bar
    url_box_x0 = 95
    url_box_w = 800
    draw.rectangle([url_box_x0, 50, url_box_x0 + url_box_w, 82], fill="#1C1C1C", outline="#3C3C3C", width=1)
    
    # Lock icon & URL
    draw.text((url_box_x0 + 12, 59), "🔒", fill="#A3E635", font=font)
    draw.text((url_box_x0 + 36, 58), "https://rselva1202.github.io/zeuralabz/", fill="#FFFFFF", font=url_font)
    
    out_path = os.path.join(artifact_dir, "browser-tab-favicon.png")
    img.save(out_path, format="PNG")
    print(f"Captured: {out_path}")

if __name__ == "__main__":
    render_browser_tab_screenshot()

