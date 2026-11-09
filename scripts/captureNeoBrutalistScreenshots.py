import asyncio
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        
        # 1. Desktop Viewport (1440x900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        print("Navigating to preview site on localhost:3000/zeuralabz/...")
        await page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)

        # Screenshot 1: Desktop Hero & Nav
        hero_shot = f"{artifact_dir}/neo-brutalist-hero.png"
        await page.screenshot(path=hero_shot)
        print(f"Captured: {hero_shot}")

        # Screenshot 2: Showcase Panel
        showcase_el = page.locator("#showcase")
        await showcase_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        showcase_shot = f"{artifact_dir}/neo-brutalist-showcase.png"
        await page.screenshot(path=showcase_shot)
        print(f"Captured: {showcase_shot}")

        # Screenshot 3: Component Catalog & Cards
        components_el = page.locator("#components")
        await components_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        catalog_shot = f"{artifact_dir}/neo-brutalist-catalog-cards.png"
        await page.screenshot(path=catalog_shot)
        print(f"Captured: {catalog_shot}")

        # Screenshot 4: Code Modal
        code_btn = page.locator("button:has-text('CODE ➔')").first
        await code_btn.click()
        await page.wait_for_timeout(800)
        modal_shot = f"{artifact_dir}/neo-brutalist-code-modal.png"
        await page.screenshot(path=modal_shot)
        print(f"Captured: {modal_shot}")

        # Close modal
        close_btn = page.locator("button:has-text('CLOSE')")
        if await close_btn.count() > 0:
            await close_btn.click()
            await page.wait_for_timeout(500)

        # 2. Mobile Viewport (iPhone 14 / 390x844)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await mobile_page.wait_for_timeout(1500)
        mobile_hero_shot = f"{artifact_dir}/neo-brutalist-mobile-hero.png"
        await mobile_page.screenshot(path=mobile_hero_shot)
        print(f"Captured: {mobile_hero_shot}")

        # Scroll to catalog on mobile
        mobile_comp = mobile_page.locator("#components")
        await mobile_comp.scroll_into_view_if_needed()
        await mobile_page.wait_for_timeout(1200)
        mobile_catalog_shot = f"{artifact_dir}/neo-brutalist-mobile-catalog.png"
        await mobile_page.screenshot(path=mobile_catalog_shot)
        print(f"Captured: {mobile_catalog_shot}")

        await browser.close()
        print("All Neo-Brutalist screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
