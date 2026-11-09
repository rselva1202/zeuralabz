import asyncio
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)

        # Click Backgrounds category
        bg_btn = page.locator("button:has-text('backgrounds')")
        await bg_btn.click()
        await page.wait_for_timeout(1000)

        # Click ZEURALABZ Original source to see original aurora, galaxy, particles
        orig_btn = page.locator("button:has-text('ZEURALABZ Original')")
        await orig_btn.click()
        await page.wait_for_timeout(1500)

        # Screenshot the cards grid
        grid_shot = f"{artifact_dir}/neo-brutalist-backgrounds-cards.png"
        components_el = page.locator("#components")
        await components_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        await page.screenshot(path=grid_shot)
        print(f"Captured: {grid_shot}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
