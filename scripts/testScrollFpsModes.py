import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:3000/zeuralabz/', wait_until='domcontentloaded')
        await page.wait_for_timeout(1000)

        # 1. Benchmark LITE mode (default)
        print("Measuring scroll FPS in Lite mode...")
        fps_lite = await page.evaluate('''() => {
            return new Promise((resolve) => {
                let frames = 0;
                let startTime = performance.now();
                function count(now) {
                    frames++;
                    if (now - startTime < 2500) {
                        requestAnimationFrame(count);
                    } else {
                        resolve(frames / ((now - startTime) / 1000));
                    }
                }
                requestAnimationFrame(count);
                let scrollY = 0;
                const iv = setInterval(() => {
                    scrollY += 100;
                    window.scrollTo(0, scrollY);
                    if (scrollY > 2500) clearInterval(iv);
                }, 40);
            });
        }''')
        print(f"Lite Mode Scroll FPS: {fps_lite:.1f} fps")

        # Capture screenshot of Lite mode with pagination controls
        await page.screenshot(path=os.path.join(artifact_dir, "perf-pagination-grid.png"))

        # 2. Click OFF button
        print("Clicking OFF motion button...")
        off_btn = page.locator("button:has-text('OFF')")
        await off_btn.click()
        await page.wait_for_timeout(500)

        fps_off = await page.evaluate('''() => {
            return new Promise((resolve) => {
                let frames = 0;
                let startTime = performance.now();
                function count(now) {
                    frames++;
                    if (now - startTime < 2500) {
                        requestAnimationFrame(count);
                    } else {
                        resolve(frames / ((now - startTime) / 1000));
                    }
                }
                requestAnimationFrame(count);
                let scrollY = 0;
                const iv = setInterval(() => {
                    scrollY += 100;
                    window.scrollTo(0, scrollY);
                    if (scrollY > 2500) clearInterval(iv);
                }, 40);
            });
        }''')
        print(f"OFF Mode Scroll FPS: {fps_off:.1f} fps")

        # Capture screenshot of OFF mode
        await page.screenshot(path=os.path.join(artifact_dir, "perf-motion-off-mode.png"))

        # 3. Test Load More button
        load_more_btn = page.locator("button:has-text('Load More')")
        cards_before = await page.locator("div.group").count()
        await load_more_btn.click()
        await page.wait_for_timeout(500)
        cards_after = await page.locator("div.group").count()
        print(f"Pagination Load More verified: {cards_before} cards -> {cards_after} cards!")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
