import asyncio
import os
from playwright.async_api import async_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "https://rselva1202.github.io/zeuralabz/"
ARTIFACTS_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        viewports = [360, 390, 768, 1024, 1440]
        print("=== VERIFYING LIVE PRODUCTION VIEWPORTS ===")
        
        for w in viewports:
            h = 844 if w < 600 else (1024 if w < 1000 else 900)
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(URL, wait_until="networkidle")
            await page.wait_for_timeout(2000)
            
            res = await page.evaluate("""
                () => {
                    const scrollW = document.documentElement.scrollWidth;
                    const innerW = window.innerWidth;
                    return { scrollW, innerW, diff: scrollW - innerW };
                }
            """)
            print(f"LIVE Viewport {w}px: scrollWidth={res['scrollW']}px, innerWidth={res['innerW']}px (Diff: {res['diff']}px)")
            await page.close()
            
        print("\n=== CAPTURING LIVE PRODUCTION SCREENSHOTS ===")
        # 1. Desktop 1440px
        p_desktop = await browser.new_page(viewport={"width": 1440, "height": 900})
        await p_desktop.goto(URL, wait_until="networkidle")
        await p_desktop.wait_for_timeout(2500)
        
        await p_desktop.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-hero-desktop.png"))
        print("Saved: live-blue-hero-desktop.png")
        
        await p_desktop.evaluate("window.scrollTo(0, 1300)")
        await p_desktop.wait_for_timeout(1500)
        await p_desktop.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-catalog-desktop.png"))
        print("Saved: live-blue-catalog-desktop.png")
        await p_desktop.close()
        
        # 2. Mobile 390px
        p_mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        await p_mobile.goto(URL, wait_until="networkidle")
        await p_mobile.wait_for_timeout(2500)
        
        await p_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-hero-mobile-390.png"))
        print("Saved: live-blue-hero-mobile-390.png")
        
        # Hamburger menu
        btn = p_mobile.locator("button[aria-label='Toggle Navigation Menu']")
        if await btn.count() > 0:
            await btn.click()
            await p_mobile.wait_for_timeout(600)
            await p_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-menu-mobile-390.png"))
            print("Saved: live-blue-menu-mobile-390.png")
            await btn.click()
            await p_mobile.wait_for_timeout(400)
            
        # Telemetry
        await p_mobile.evaluate("window.scrollTo(0, 500)")
        await p_mobile.wait_for_timeout(600)
        await p_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-telemetry-mobile-390.png"))
        print("Saved: live-blue-telemetry-mobile-390.png")
        
        # Cards
        await p_mobile.evaluate("window.scrollTo(0, 1600)")
        await p_mobile.wait_for_timeout(600)
        await p_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-catalog-mobile-390.png"))
        print("Saved: live-blue-catalog-mobile-390.png")
        
        # Full page
        await p_mobile.screenshot(path=os.path.join(ARTIFACTS_DIR, "live-blue-full-mobile-390.png"), full_page=True)
        print("Saved: live-blue-full-mobile-390.png")
        await p_mobile.close()
        
        await browser.close()
        print("All live production verifications completed successfully!")

if __name__ == "__main__":
    asyncio.run(main())

