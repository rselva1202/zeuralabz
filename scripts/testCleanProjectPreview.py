import asyncio
import os
import subprocess
import time
from playwright.async_api import async_playwright

async def main():
    artifact_dir = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    test_dir = r"D:\MY PROJECTS\test-zeuralabz"

    # Start vite preview in test_dir
    print("Starting vite preview in test-zeuralabz...")
    proc = subprocess.Popen(
        ["npx", "vite", "preview", "--port", "4173"],
        cwd=test_dir,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(3)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
            page = await browser.new_page(viewport={'width': 1440, 'height': 900})

            print("Navigating to test-zeuralabz preview...")
            await page.goto('http://localhost:4173', wait_until='networkidle')
            await page.wait_for_timeout(2000)

            screenshot_path = os.path.join(artifact_dir, "clean-test-react-bits-aurora.png")
            await page.screenshot(path=screenshot_path)
            print(f"Saved {screenshot_path}")

            await browser.close()
    finally:
        print("Terminating preview server...")
        subprocess.run(f"taskkill /F /T /PID {proc.pid}", shell=True, capture_output=True)

if __name__ == "__main__":
    asyncio.run(main())

