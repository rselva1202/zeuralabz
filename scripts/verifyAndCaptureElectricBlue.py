import asyncio
import os
import subprocess
import time
import http.server
import socketserver
import threading
from playwright.async_api import async_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 4188
DIST_DIR = os.path.abspath(r"D:\MY PROJECTS\ZEURALABZ\preview-site\dist")
ARTIFACTS_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def translate_path(self, path):
        # strip /zeuralabz/ prefix so vite base path resolves cleanly to dist
        if path.startswith("/zeuralabz/"):
            path = path[len("/zeuralabz"):]
        elif path == "/zeuralabz":
            path = "/"
        return super().translate_path(path)
    def log_message(self, format, *args):
        pass # suppress logs

def start_server():
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd

async def run_verification():
    httpd = start_server()
    print(f"Local server running on http://127.0.0.1:{PORT}/zeuralabz/")
    
    url = f"http://127.0.0.1:{PORT}/zeuralabz/"
    viewports = [360, 390, 768, 1024, 1440]
    
    results = {}
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        for w in viewports:
            h = 844 if w < 600 else (1024 if w < 1000 else 900)
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(url, wait_until="domcontentloaded")
            await page.wait_for_timeout(2000)
            
            # Scroll down and back up to trigger lazy components
            await page.evaluate("window.scrollTo(0, 1000)")
            await page.wait_for_timeout(500)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(500)
            
            metrics = await page.evaluate("""
                () => {
                    const scrollW = document.documentElement.scrollWidth;
                    const innerW = window.innerWidth;
                    const bodyScrollW = document.body.scrollWidth;
                    
                    const overflowing = [];
                    document.querySelectorAll('*').forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > innerW + 1) { // 1px threshold for subpixel rounding
                            overflowing.push({
                                tag: el.tagName,
                                id: el.id,
                                class: (el.className || '').toString().slice(0, 50),
                                width: Math.round(rect.width),
                                text: (el.innerText || '').slice(0, 30).replace(/\\n/g, ' ')
                            });
                        }
                    });
                    
                    return {
                        scrollWidth: scrollW,
                        innerWidth: innerW,
                        bodyScrollWidth: bodyScrollW,
                        diff: scrollW - innerW,
                        overflowingCount: overflowing.length,
                        overflowing: overflowing.slice(0, 10)
                    };
                }
            """)
            
            results[w] = metrics
            print(f"Viewport {w}px: scrollWidth={metrics['scrollWidth']}px, innerWidth={metrics['innerWidth']}px, Diff={metrics['diff']}px, Overflows={metrics['overflowingCount']}")
            
            if metrics['overflowingCount'] > 0:
                print(f"  Warning: overflowing elements found in {w}px:")
                for item in metrics['overflowing']:
                    print(f"    - [{item['tag']}] #{item['id']} .{item['class']} -> {item['width']}px ({item['text']})")
                    
            await page.close()
            
        # Capture screenshots
        print("\n--- Capturing Screenshots ---")
        
        # 1. Desktop 1440px Hero & Showcase
        page_desktop = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page_desktop.goto(url, wait_until="networkidle")
        await page_desktop.wait_for_timeout(2000)
        
        hero_path = os.path.join(ARTIFACTS_DIR, "blue-hero-desktop.png")
        await page_desktop.screenshot(path=hero_path)
        print(f"Saved: {hero_path}")
        
        # Scroll to catalog
        await page_desktop.evaluate("window.scrollTo(0, 1200)")
        await page_desktop.wait_for_timeout(1000)
        catalog_path = os.path.join(ARTIFACTS_DIR, "blue-catalog-desktop.png")
        await page_desktop.screenshot(path=catalog_path)
        print(f"Saved: {catalog_path}")
        await page_desktop.close()
        
        # 2. Mobile 390px
        page_mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_mobile.goto(url, wait_until="networkidle")
        await page_mobile.wait_for_timeout(2000)
        
        mobile_hero_path = os.path.join(ARTIFACTS_DIR, "blue-hero-mobile-390.png")
        await page_mobile.screenshot(path=mobile_hero_path)
        print(f"Saved: {mobile_hero_path}")
        
        # Open mobile hamburger menu
        hamburger = page_mobile.locator("button[aria-label='Toggle Navigation Menu']")
        if await hamburger.count() > 0:
            await hamburger.click()
            await page_mobile.wait_for_timeout(600)
            mobile_menu_path = os.path.join(ARTIFACTS_DIR, "blue-mobile-menu-390.png")
            await page_mobile.screenshot(path=mobile_menu_path)
            print(f"Saved: {mobile_menu_path}")
            await hamburger.click() # close menu
            await page_mobile.wait_for_timeout(400)
            
        # Scroll down to telemetry
        await page_mobile.evaluate("window.scrollTo(0, 500)")
        await page_mobile.wait_for_timeout(600)
        mobile_telem_path = os.path.join(ARTIFACTS_DIR, "blue-mobile-telemetry-390.png")
        await page_mobile.screenshot(path=mobile_telem_path)
        print(f"Saved: {mobile_telem_path}")
        
        # Scroll to catalog cards
        await page_mobile.evaluate("window.scrollTo(0, 1500)")
        await page_mobile.wait_for_timeout(600)
        mobile_cat_path = os.path.join(ARTIFACTS_DIR, "blue-mobile-catalog-390.png")
        await page_mobile.screenshot(path=mobile_cat_path)
        print(f"Saved: {mobile_cat_path}")
        
        # Full page mobile screenshot
        mobile_full_path = os.path.join(ARTIFACTS_DIR, "blue-mobile-full-390.png")
        await page_mobile.screenshot(path=mobile_full_path, full_page=True)
        print(f"Saved: {mobile_full_path}")
        
        await page_mobile.close()
        
        await browser.close()
        
    httpd.shutdown()
    print("Verification and captures complete!")
    return results

if __name__ == "__main__":
    asyncio.run(run_verification())
