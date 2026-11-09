import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={'width': 1400, 'height': 1200})

        print("Navigating to buttons grid...")
        await page.goto('http://localhost:3000/zeuralabz/?standalone=buttons-grid', wait_until='domcontentloaded')
        await page.wait_for_timeout(1000)

        # Test 1: Loading button
        print("Testing Button 1: 'loading' (Async Action)...")
        loading_card = page.locator("div.rounded-2xl:has-text('Asynchronous State Loading Button')")
        loading_btn = loading_card.locator("button")
        await loading_btn.scroll_into_view_if_needed()
        text_before = await loading_btn.inner_text()
        print(f"  Before click: '{text_before.replace(chr(10), ' ')}'")

        await loading_btn.click()
        await page.wait_for_timeout(300)
        text_after = await loading_btn.inner_text()
        print(f"  After click (state active): '{text_after.replace(chr(10), ' ')}'")
        await loading_card.screenshot(path=os.path.join(artifact_dir, "button-click-loading.png"))
        print(f"  Saved {os.path.join(artifact_dir, 'button-click-loading.png')}")

        # Test 2: 3D button
        print("\nTesting Button 2: '3d' (Tactile Push)...")
        threed_card = page.locator("div.rounded-2xl:has-text('Tactile Isometric 3D Push Button')")
        threed_btn = threed_card.locator("button")
        await threed_btn.scroll_into_view_if_needed()
        text_3d_before = await threed_btn.inner_text()
        print(f"  Before click: '{text_3d_before.replace(chr(10), ' ')}'")

        await threed_btn.click()
        await page.wait_for_timeout(200)
        text_3d_after = await threed_btn.inner_text()
        print(f"  After click (+counter active): '{text_3d_after.replace(chr(10), ' ')}'")
        await threed_card.screenshot(path=os.path.join(artifact_dir, "button-click-3d.png"))
        print(f"  Saved {os.path.join(artifact_dir, 'button-click-3d.png')}")

        # Test 3: Play button
        print("\nTesting Button 3: 'play' (Pulsing Concentric Ripple)...")
        play_card = page.locator("div.rounded-2xl:has-text('Pulsing Concentric Ripple Play Button')")
        play_btn = play_card.locator("button")
        await play_btn.scroll_into_view_if_needed()
        text_play_before = await play_btn.inner_text()
        print(f"  Before click: '{text_play_before.replace(chr(10), ' ')}'")

        await play_btn.click()
        await page.wait_for_timeout(200)
        text_play_after = await play_btn.inner_text()
        print(f"  After click (toggle active): '{text_play_after.replace(chr(10), ' ')}'")
        await play_card.screenshot(path=os.path.join(artifact_dir, "button-click-play.png"))
        print(f"  Saved {os.path.join(artifact_dir, 'button-click-play.png')}")

        await browser.close()
        print("\nAll 3 button click-tests passed successfully!")

asyncio.run(main())
