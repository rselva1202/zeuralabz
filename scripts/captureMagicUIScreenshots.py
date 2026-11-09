import asyncio
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={"width": 1400, "height": 900})
        
        print("Navigating to preview site...")
        await page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)
        
        # Scroll to components section
        print("Clicking Magic UI source filter...")
        # Find Magic UI button
        magic_ui_btn = page.locator("button:has-text('Magic UI • MIT')")
        await magic_ui_btn.click()
        await page.wait_for_timeout(1000)
        
        # Take catalog view screenshot
        catalog_path = "C:/Users/ELCOT/.gemini/antigravity/brain/951d08b8-2f3a-401e-982d-6fc08b140ed2/magic-ui-catalog-view.png"
        await page.screenshot(path=catalog_path)
        print(f"Captured {catalog_path}")
        
        # Click on the first 'Code ➔' button
        print("Clicking Code modal button on a Magic UI card...")
        code_btn = page.locator("button:has-text('Code ➔')").first
        await code_btn.click()
        await page.wait_for_timeout(800)
        
        modal_path = "C:/Users/ELCOT/.gemini/antigravity/brain/951d08b8-2f3a-401e-982d-6fc08b140ed2/magic-ui-modal-view.png"
        await page.screenshot(path=modal_path)
        print(f"Captured {modal_path}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
