import os
import asyncio
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
LIVE_URL = "https://rselva1202.github.io/zeuralabz/"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        # 1. Desktop Viewport (1440x900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        print(f"Navigating to LIVE site {LIVE_URL}...")
        await page.goto(LIVE_URL, wait_until="domcontentloaded")
        await page.wait_for_timeout(3000)

        # Live Hero
        live_hero = os.path.join(ARTIFACT_DIR, "live-published-hero.png")
        await page.screenshot(path=live_hero)
        print(f"Captured: {live_hero}")

        # Scroll to Showcase
        showcase = page.locator("#showcase")
        if await showcase.count() > 0:
            await showcase.scroll_into_view_if_needed()
            await page.wait_for_timeout(1000)
            live_showcase = os.path.join(ARTIFACT_DIR, "live-published-showcase.png")
            await page.screenshot(path=live_showcase)
            print(f"Captured: {live_showcase}")

        # Scroll to Components Catalog
        components = page.locator("#components")
        if await components.count() > 0:
            await components.scroll_into_view_if_needed()
            await page.wait_for_timeout(1500)
            live_catalog = os.path.join(ARTIFACT_DIR, "live-published-catalog.png")
            await page.screenshot(path=live_catalog)
            print(f"Captured: {live_catalog}")

        # Test React Bits filter
        react_bits_btn = page.locator("button:has-text('React Bits • MIT')").first
        if await react_bits_btn.count() > 0:
            await react_bits_btn.click()
            await page.wait_for_timeout(2000)
            live_react_bits = os.path.join(ARTIFACT_DIR, "live-published-react-bits.png")
            await page.screenshot(path=live_react_bits)
            print(f"Captured: {live_react_bits}")

        # Test Magic UI filter
        magic_ui_btn = page.locator("button:has-text('Magic UI • MIT')").first
        if await magic_ui_btn.count() > 0:
            await magic_ui_btn.click()
            await page.wait_for_timeout(2000)
            live_magic_ui = os.path.join(ARTIFACT_DIR, "live-published-magic-ui.png")
            await page.screenshot(path=live_magic_ui)
            print(f"Captured: {live_magic_ui}")

        # Test Aceternity filter
        aceternity_btn = page.locator("button:has-text('Aceternity UI • MIT')").first
        if await aceternity_btn.count() > 0:
            await aceternity_btn.click()
            await page.wait_for_timeout(2000)
            live_aceternity = os.path.join(ARTIFACT_DIR, "live-published-aceternity.png")
            await page.screenshot(path=live_aceternity)
            print(f"Captured: {live_aceternity}")

        # 2. Mobile Viewport (iPhone 14)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto(LIVE_URL, wait_until="domcontentloaded")
        await mobile_page.wait_for_timeout(2000)
        live_mobile = os.path.join(ARTIFACT_DIR, "live-published-mobile.png")
        await mobile_page.screenshot(path=live_mobile)
        print(f"Captured: {live_mobile}")

        await browser.close()
        print("Live verification and screenshots completed successfully!")

if __name__ == "__main__":
    asyncio.run(main())
