import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={'width': 1440, 'height': 1050})

        # 1. Capture React Bits source filter
        print("Navigating to React Bits filter...")
        await page.goto('http://localhost:3000/zeuralabz/?source=react-bits', wait_until='networkidle')
        await page.wait_for_timeout(1000)

        # Scroll down so the catalog header and cards are centered
        catalog_section = page.locator("#components")
        await catalog_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)

        rb_screenshot_path = os.path.join(artifact_dir, "react-bits-catalog-view.png")
        await page.screenshot(path=rb_screenshot_path)
        print(f"Saved {rb_screenshot_path}")

        # 2. Click Code button on the first React Bits card ('Animated Content')
        print("Opening modal for first React Bits component...")
        first_code_btn = page.locator("div.group button:has-text('Code ➔')").first
        await first_code_btn.click()
        await page.wait_for_timeout(800)

        modal_screenshot_path = os.path.join(artifact_dir, "react-bits-modal-view.png")
        await page.screenshot(path=modal_screenshot_path)
        print(f"Saved {modal_screenshot_path}")

        # Close modal
        close_btn = page.locator("button:has-text('✕')")
        if await close_btn.count() > 0:
            await close_btn.click()
            await page.wait_for_timeout(500)

        # 3. Capture ZEURALABZ Original filter
        print("Navigating to ZEURALABZ Original filter...")
        await page.goto('http://localhost:3000/zeuralabz/?source=zeuralabz-original', wait_until='networkidle')
        await page.wait_for_timeout(1000)

        catalog_section_orig = page.locator("#components")
        await catalog_section_orig.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)

        zeura_screenshot_path = os.path.join(artifact_dir, "zeuralabz-original-catalog-view.png")
        await page.screenshot(path=zeura_screenshot_path)
        print(f"Saved {zeura_screenshot_path}")

        await browser.close()
        print("All screenshots successfully captured!")

if __name__ == "__main__":
    asyncio.run(main())
