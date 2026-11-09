import asyncio
import os
import time
from playwright.async_api import async_playwright

async def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})

        print("Navigating to preview site to benchmark baseline lag...")
        t0 = time.time()
        await page.goto('http://localhost:3000/zeuralabz/', wait_until='domcontentloaded')
        await page.wait_for_timeout(1500)
        initial_load_time = time.time() - t0
        print(f"Initial Load Time: {initial_load_time:.2f}s")

        # Count canvas and animated elements
        canvas_count = await page.locator("canvas").count()
        cards_count = await page.locator("div.group").count()
        print(f"Total cards mounted simultaneously: {cards_count}")
        print(f"Total <canvas> elements active on page: {canvas_count}")

        # Measure FPS during scroll
        print("Measuring scroll FPS across 3 seconds...")
        fps_data = await page.evaluate('''() => {
            return new Promise((resolve) => {
                let frames = 0;
                let startTime = performance.now();
                let lastTime = performance.now();
                let rafCount = 0;

                function countFrame(now) {
                    frames++;
                    rafCount++;
                    if (now - startTime < 3000) {
                        requestAnimationFrame(countFrame);
                    } else {
                        const duration = (now - startTime) / 1000;
                        const fps = frames / duration;
                        resolve({ fps, duration, frames });
                    }
                }
                requestAnimationFrame(countFrame);

                // Simulate continuous scrolling
                let scrollY = 0;
                const scrollInterval = setInterval(() => {
                    scrollY += 120;
                    window.scrollTo(0, scrollY);
                    if (scrollY > 3000) clearInterval(scrollInterval);
                }, 50);
            });
        }''')

        print(f"Average Scroll FPS: {fps_data['fps']:.1f} fps (Frames: {fps_data['frames']} in {fps_data['duration']:.2f}s)")

        # Evaluate canvas particle loops & heaviest background archetypes
        heaviest = [
            ("Galaxy Cosmic Canvas", "850 stars with 3 spiral arms, radial blur, shadowBlur per star"),
            ("Chromatic Ambient Noise", "Nested loop over (width / 4) * (height / 4) pixels every frame"),
            ("Reactive Dot Matrix Grid", "600 dots with sinusoidal 2D wave elevation math on every frame"),
            ("Deep Space Starfield", "850 twinkling stars with shadowBlur"),
            ("Floating Particle Network", "130 particles with O(N^2) pairwise distance checks and line drawing")
        ]
        print("\nTop 5 Heaviest Components:")
        for name, desc in heaviest:
            print(f"- {name}: {desc}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
