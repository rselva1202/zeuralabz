import asyncio
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        print("Navigating to preview site on http://localhost:3000/zeuralabz/...")
        await page.goto("http://localhost:3000/zeuralabz/", wait_until="domcontentloaded")
        await page.wait_for_timeout(2500)

        # 1. Hero with 531 components and Aceternity telemetry
        hero_path = f"{artifact_dir}/aceternity-hero-531.png"
        await page.screenshot(path=hero_path)
        print(f"Captured Hero: {hero_path}")

        # 2. Click Aceternity UI filter pill
        components_el = page.locator("#components")
        await components_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)

        aceternity_btn = page.locator("button:has-text('Aceternity UI • MIT')").first
        await aceternity_btn.click()
        await page.wait_for_timeout(1500)

        catalog_path = f"{artifact_dir}/aceternity-source-filter-catalog.png"
        await page.screenshot(path=catalog_path)
        print(f"Captured Aceternity Catalog: {catalog_path}")

        # 3. Aceternity Code Modal
        code_btn = page.locator("button:has-text('CODE ➔')").first
        await code_btn.click()
        await page.wait_for_timeout(1000)

        modal_path = f"{artifact_dir}/aceternity-code-modal.png"
        await page.screenshot(path=modal_path)
        print(f"Captured Aceternity Code Modal: {modal_path}")

        # Close modal
        close_btn = page.locator("button:has-text('CLOSE')").first
        if await close_btn.count() > 0:
            await close_btn.click()
            await page.wait_for_timeout(600)

        # 4. Pagination on Aceternity view
        pagination_el = page.locator("button:has-text('NEXT ▶')")
        if await pagination_el.count() > 0:
            await pagination_el.scroll_into_view_if_needed()
            await page.wait_for_timeout(800)
            pagination_path = f"{artifact_dir}/aceternity-pagination.png"
            await page.screenshot(path=pagination_path)
            print(f"Captured Aceternity Pagination: {pagination_path}")

        await browser.close()
        print("All Aceternity screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
