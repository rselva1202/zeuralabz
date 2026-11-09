import asyncio
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        
        # 1. Desktop Viewport (1440x900) on LIVE GITHUB PAGES
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        print("Navigating to LIVE site on https://rselva1202.github.io/zeuralabz/...")
        await page.goto("https://rselva1202.github.io/zeuralabz/", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Screenshot 1: Desktop Hero & Nav
        hero_shot = f"{artifact_dir}/dark-live-hero.png"
        await page.screenshot(path=hero_shot)
        print(f"Captured: {hero_shot}")

        # Screenshot 2: Showcase Panel
        showcase_el = page.locator("#showcase")
        await showcase_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        showcase_shot = f"{artifact_dir}/dark-live-showcase.png"
        await page.screenshot(path=showcase_shot)
        print(f"Captured: {showcase_shot}")

        # Screenshot 3: Component Catalog
        components_el = page.locator("#components")
        await components_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        catalog_shot = f"{artifact_dir}/dark-live-catalog.png"
        await page.screenshot(path=catalog_shot)
        print(f"Captured: {catalog_shot}")

        # 2. Mobile Viewport (iPhone 14 / 390x844) on LIVE GITHUB PAGES
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("https://rselva1202.github.io/zeuralabz/", wait_until="networkidle")
        await mobile_page.wait_for_timeout(1500)
        mobile_hero_shot = f"{artifact_dir}/dark-live-mobile-hero.png"
        await mobile_page.screenshot(path=mobile_hero_shot)
        print(f"Captured: {mobile_hero_shot}")

        await browser.close()
        print("All live deployed screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
