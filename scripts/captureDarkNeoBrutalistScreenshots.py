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
        hero_shot = f"{artifact_dir}/dark-neo-brutalist-hero.png"
        await page.screenshot(path=hero_shot)
        print(f"Captured: {hero_shot}")

        # Screenshot 2: Showcase Panel
        showcase_el = page.locator("#showcase")
        await showcase_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        showcase_shot = f"{artifact_dir}/dark-neo-brutalist-showcase.png"
        await page.screenshot(path=showcase_shot)
        print(f"Captured: {showcase_shot}")

        # Screenshot 3: Component Catalog & Cards
        components_el = page.locator("#components")
        await components_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        catalog_shot = f"{artifact_dir}/dark-neo-brutalist-catalog.png"
        await page.screenshot(path=catalog_shot)
        print(f"Captured: {catalog_shot}")

        # Screenshot 4: Pagination Controls (Bottom of Catalog)
        pagination_el = page.locator("button:has-text('NEXT ▶')")
        if await pagination_el.count() > 0:
            await pagination_el.scroll_into_view_if_needed()
            await page.wait_for_timeout(800)
            pagination_shot = f"{artifact_dir}/dark-neo-brutalist-pagination.png"
            await page.screenshot(path=pagination_shot)
            print(f"Captured: {pagination_shot}")

        # Screenshot 5: Magic UI Filter View
        magic_ui_btn = page.locator("button:has-text('Magic UI • MIT')").first
        if await magic_ui_btn.count() > 0:
            await magic_ui_btn.click()
            await page.wait_for_timeout(1000)
            magic_shot = f"{artifact_dir}/dark-magic-ui-catalog.png"
            await page.screenshot(path=magic_shot)
            print(f"Captured: {magic_shot}")

            # Magic UI Modal
            code_btn = page.locator("button:has-text('CODE ➔')").first
            await code_btn.click()
            await page.wait_for_timeout(800)
            modal_shot = f"{artifact_dir}/dark-neo-brutalist-modal.png"
            await page.screenshot(path=modal_shot)
            print(f"Captured: {modal_shot}")

            close_btn = page.locator("button:has-text('CLOSE')")
            if await close_btn.count() > 0:
                await close_btn.click()
                await page.wait_for_timeout(500)

        # Screenshot 6: React Bits Filter View
        react_bits_btn = page.locator("button:has-text('React Bits • MIT')").first
        if await react_bits_btn.count() > 0:
            await react_bits_btn.click()
            await page.wait_for_timeout(1000)
            rb_shot = f"{artifact_dir}/dark-react-bits-catalog.png"
            await page.screenshot(path=rb_shot)
            print(f"Captured: {rb_shot}")

        # 2. Standalone View
        standalone_page = await browser.new_page(viewport={"width": 1200, "height": 800})
        await standalone_page.goto("http://localhost:3000/zeuralabz/?standalone=galaxy", wait_until="domcontentloaded")
        await standalone_page.wait_for_timeout(1500)
        standalone_shot = f"{artifact_dir}/dark-standalone-preview.png"
        await standalone_page.screenshot(path=standalone_shot)
        print(f"Captured: {standalone_shot}")

        # 3. Direct Favicon SVG Render
        fav_page = await browser.new_page(viewport={"width": 256, "height": 256})
        await fav_page.goto("http://localhost:3000/zeuralabz/favicon.svg", wait_until="domcontentloaded")
        await fav_page.wait_for_timeout(500)
        fav_shot = f"{artifact_dir}/favicon-svg-preview.png"
        await fav_page.screenshot(path=fav_shot)
        print(f"Captured: {fav_shot}")

        # 4. Mobile Viewport (iPhone 14 / 390x844)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await mobile_page.wait_for_timeout(1500)
        mobile_hero_shot = f"{artifact_dir}/dark-neo-brutalist-mobile-hero.png"
        await mobile_page.screenshot(path=mobile_hero_shot)
        print(f"Captured: {mobile_hero_shot}")

        # Scroll to catalog on mobile
        mobile_comp = mobile_page.locator("#components")
        await mobile_comp.scroll_into_view_if_needed()
        await mobile_page.wait_for_timeout(1200)
        mobile_catalog_shot = f"{artifact_dir}/dark-neo-brutalist-mobile-catalog.png"
        await mobile_page.screenshot(path=mobile_catalog_shot)
        print(f"Captured: {mobile_catalog_shot}")

        await browser.close()
        print("All Dark Neo-Brutalist screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
