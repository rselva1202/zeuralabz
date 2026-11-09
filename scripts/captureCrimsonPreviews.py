import os
import asyncio
from playwright.async_api import async_playwright

ARTIFACT_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
BASE_URL = "http://localhost:3000/zeuralabz/"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        # 1. Desktop Viewport (1440x900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        print("Navigating to", BASE_URL)
        await page.goto(BASE_URL, wait_until="domcontentloaded")
        await page.wait_for_timeout(2500)

        # Capture Desktop Hero
        hero_path = os.path.join(ARTIFACT_DIR, "crimson-hero-desktop.png")
        await page.screenshot(path=hero_path)
        print("Captured crimson-hero-desktop.png")

        # Scroll down to catalog
        components_section = page.locator("#components")
        await components_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(2000)

        # Capture Catalog Grid with cards & pagination
        grid_path = os.path.join(ARTIFACT_DIR, "crimson-catalog-grid.png")
        await page.screenshot(path=grid_path)
        print("Captured crimson-catalog-grid.png")

        # Capture React Bits live card
        react_bits_btn = page.locator("button:has-text('React Bits • MIT')").first
        if await react_bits_btn.count() > 0:
            await react_bits_btn.click()
            await page.wait_for_timeout(2000)
            first_card = page.locator(".group.rounded-lg").first
            if await first_card.count() > 0:
                await first_card.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-react-bits-card.png"))
                print("Captured crimson-react-bits-card.png")

        # Capture Magic UI live card
        magic_ui_btn = page.locator("button:has-text('Magic UI • MIT')").first
        if await magic_ui_btn.count() > 0:
            await magic_ui_btn.click()
            await page.wait_for_timeout(2000)
            first_card = page.locator(".group.rounded-lg").first
            if await first_card.count() > 0:
                await first_card.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-magic-ui-card.png"))
                print("Captured crimson-magic-ui-card.png")

        # Capture Aceternity live card
        aceternity_btn = page.locator("button:has-text('Aceternity UI • MIT')").first
        if await aceternity_btn.count() > 0:
            await aceternity_btn.click()
            await page.wait_for_timeout(2000)
            first_card = page.locator(".group.rounded-lg").first
            if await first_card.count() > 0:
                await first_card.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-aceternity-card.png"))
                print("Captured crimson-aceternity-card.png")

        # Open code modal for Aceternity card
        code_btn = page.locator("button:has-text('CODE ➔')").first
        if await code_btn.count() > 0:
            await code_btn.click()
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-code-modal.png"))
            print("Captured crimson-code-modal.png")
            # Close modal
            close_btn = page.locator("button:has-text('✕')").first
            if await close_btn.count() > 0:
                await close_btn.click()
                await page.wait_for_timeout(500)

        # Capture ZEURALABZ original live card
        orig_btn = page.locator("button:has-text('ZEURALABZ Original')").first
        if await orig_btn.count() > 0:
            await orig_btn.click()
            await page.wait_for_timeout(2000)
            first_card = page.locator(".group.rounded-lg").first
            if await first_card.count() > 0:
                await first_card.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-original-card.png"))
                print("Captured crimson-original-card.png")

        # 2. Mobile Viewport (iPhone 14)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto(BASE_URL, wait_until="domcontentloaded")
        await mobile_page.wait_for_timeout(2000)
        await mobile_page.screenshot(path=os.path.join(ARTIFACT_DIR, "crimson-hero-mobile.png"))
        print("Captured crimson-hero-mobile.png")

        await browser.close()
        print("All screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
