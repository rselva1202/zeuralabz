import asyncio
import os
import http.server
import socketserver
import threading
from playwright.async_api import async_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 4192
DIST_DIR = os.path.abspath(r"D:\MY PROJECTS\ZEURALABZ\preview-site\dist")
ARTIFACTS_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def translate_path(self, path):
        if path.startswith("/zeuralabz/"):
            path = path[len("/zeuralabz"):]
        elif path == "/zeuralabz":
            path = "/"
        return super().translate_path(path)
    def log_message(self, format, *args):
        pass

def start_server():
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd

async def run_all():
    httpd = start_server()
    url = f"http://127.0.0.1:{PORT}/zeuralabz/"
    print(f"Server running at {url}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        # 1. VIEWPORT METRICS AUDIT
        print("\n=== 1. AUDITING VIEWPORT OVERFLOWS ===")
        viewports = [360, 390, 768, 1024, 1440]
        results = {}
        for w in viewports:
            h = 844 if w < 600 else (1024 if w < 1000 else 900)
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(1500)

            res = await page.evaluate("""
                () => {
                    const scrollW = document.documentElement.scrollWidth;
                    const innerW = window.innerWidth;
                    return { scrollW, innerW, diff: scrollW - innerW };
                }
            """)
            results[w] = res
            print(f"Viewport {w}px: scrollWidth={res['scrollW']}px, innerWidth={res['innerW']}px, Diff={res['diff']}px")
            await page.close()

        # 2. HERO LIVE ENGINES SWITCHER VERIFICATION
        print("\n=== 2. TESTING LIVE CANVAS ENGINE SWITCHER ===")
        page_desktop = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page_desktop.goto(url, wait_until="networkidle")
        await page_desktop.wait_for_timeout(2000)

        # Save Desktop Hero
        await page_desktop.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-hero-desktop.png"))
        print("Saved: mint-hero-desktop.png")

        # Locate engine buttons and canvas stage
        canvas_stage = page_desktop.locator("div:has(> canvas)")

        engines = ['aurora', 'galaxy', 'particles', 'gradient']
        for eng in engines:
            # Click button with exact text
            btn = page_desktop.locator(f"button:has-text('{eng}')")
            if await btn.count() > 0:
                await btn.first.click()
                await page_desktop.wait_for_timeout(1200) # wait for animation loop to render
                save_path = os.path.join(ARTIFACTS_DIR, f"mint-engine-{eng}.png")
                # Screenshot the canvas stage
                if await canvas_stage.count() > 0:
                    await canvas_stage.first.screenshot(path=save_path)
                else:
                    await page_desktop.screenshot(path=save_path)
                print(f"Saved: mint-engine-{eng}.png")

        # 3. TEST COMPONENT CARDS (5 DIFFERENT SOURCES & SLUGS)
        print("\n=== 3. TESTING COMPONENT CARDS PREVIEWS ===")
        # Scroll down to catalog
        await page_desktop.evaluate("document.getElementById('components').scrollIntoView({ behavior: 'instant' })")
        await page_desktop.wait_for_timeout(1500)

        await page_desktop.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-catalog-desktop.png"))
        print("Saved: mint-catalog-desktop.png")

        # Filter: React Bits
        rb_btn = page_desktop.locator("button:has-text('React Bits')")
        if await rb_btn.count() > 0:
            await rb_btn.first.click()
            await page_desktop.wait_for_timeout(1000)
            card = page_desktop.locator("div.group.rounded-\\[6px\\]").first
            await card.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-card-reactbits.png"))
            print("Saved: mint-card-reactbits.png")

        # Filter: Magic UI
        mui_btn = page_desktop.locator("button:has-text('Magic UI')")
        if await mui_btn.count() > 0:
            await mui_btn.first.click()
            await page_desktop.wait_for_timeout(1000)
            card = page_desktop.locator("div.group.rounded-\\[6px\\]").first
            await card.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-card-magicui.png"))
            print("Saved: mint-card-magicui.png")

        # Filter: Aceternity UI
        ace_btn = page_desktop.locator("button:has-text('Aceternity UI')")
        if await ace_btn.count() > 0:
            await ace_btn.first.click()
            await page_desktop.wait_for_timeout(1000)
            card = page_desktop.locator("div.group.rounded-\\[6px\\]").first
            await card.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-card-aceternity.png"))
            print("Saved: mint-card-aceternity.png")

        # Filter: ZEURALABZ Original
        orig_btn = page_desktop.locator("button:has-text('ZEURALABZ Original')")
        if await orig_btn.count() > 0:
            await orig_btn.first.click()
            await page_desktop.wait_for_timeout(1000)
            cards = page_desktop.locator("div.group.rounded-\\[6px\\]")
            if await cards.count() >= 2:
                await cards.nth(0).screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-card-original-1.png"))
                await cards.nth(1).screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-card-original-2.png"))
                print("Saved: mint-card-original-1.png and mint-card-original-2.png")

        await page_desktop.close()

        # 4. MOBILE 390px VERIFICATION
        print("\n=== 4. MOBILE 390px SCREENSHOTS ===")
        page_mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_mobile.goto(url, wait_until="networkidle")
        await page_mobile.wait_for_timeout(2000)

        # Mobile Hero
        await page_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-hero-mobile-390.png"))
        print("Saved: mint-hero-mobile-390.png")

        # Mobile Hamburger Menu
        hamb = page_mobile.locator("button[aria-label='Toggle Navigation Menu']")
        if await hamb.count() > 0:
            await hamb.click()
            await page_mobile.wait_for_timeout(500)
            await page_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-menu-mobile-390.png"))
            print("Saved: mint-menu-mobile-390.png")
            await hamb.click()
            await page_mobile.wait_for_timeout(300)

        # Mobile Telemetry
        await page_mobile.evaluate("window.scrollTo(0, 480)")
        await page_mobile.wait_for_timeout(500)
        await page_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-telemetry-mobile-390.png"))
        print("Saved: mint-telemetry-mobile-390.png")

        # Mobile Full Page
        await page_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "mint-full-mobile-390.png"), full_page=True)
        print("Saved: mint-full-mobile-390.png")

        await page_mobile.close()
        await browser.close()

    httpd.shutdown()
    print("\nAll verifications and captures completed successfully!")

if __name__ == "__main__":
    asyncio.run(run_all())
