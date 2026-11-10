import asyncio
import json
from playwright.async_api import async_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "https://rselva1202.github.io/zeuralabz/"

async def diagnose():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        viewports = [360, 390, 768]
        for w in viewports:
            page = await browser.new_page(viewport={"width": w, "height": 844})
            await page.goto(URL, wait_until="domcontentloaded")
            await page.wait_for_timeout(2500)
            
            res = await page.evaluate("""
                () => {
                    const scrollW = document.documentElement.scrollWidth;
                    const innerW = window.innerWidth;
                    const overflowing = [];
                    document.querySelectorAll('*').forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > innerW + 1) { // 1px margin
                            overflowing.push({
                                tag: el.tagName,
                                id: el.id,
                                class: el.className,
                                width: Math.round(rect.width),
                                text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
                            });
                        }
                    });
                    return { scrollW, innerW, overflowing };
                }
            """)
            print(f"=== VIEWPORT {w}px ===")
            print(f"scrollWidth: {res['scrollW']} vs innerWidth: {res['innerW']} (Diff: {res['scrollW'] - res['innerW']}px)")
            print(f"Total overflowing elements: {len(res['overflowing'])}")
            for item in res['overflowing'][:20]: # show top 20
                print(f"  [{item['tag']}] #{item['id']} .{item['class'][:60]} -> width: {item['width']}px | text: {item['text']}")
            print("\n")
            await page.close()
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(diagnose())

