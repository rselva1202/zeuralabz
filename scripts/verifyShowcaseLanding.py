import os
import sys
import time
import subprocess
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r"C:\Users\ELCOT\.gemini\antigravity\brain\951d08b8-2f3a-401e-982d-6fc08b140ed2"
DIST_DIR = r"D:\MY PROJECTS\ZEURALABZ\preview-site\dist"

def run_verification(target_url=None):
    server_process = None
    if not target_url:
        print("Starting local preview server on port 4173...")
        server_process = subprocess.Popen(
            ["npx", "vite", "preview", "--port", "4173", "--strictPort"],
            cwd=r"D:\MY PROJECTS\ZEURALABZ\preview-site",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True
        )
        time.sleep(3)
        target_url = "http://localhost:4173/zeuralabz/"

    print(f"Target URL: {target_url}")
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="chrome")

        # 1. Desktop Viewport (1280x900)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        print(f"Navigating to {target_url}...")
        page.goto(target_url, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Verify Title
        title = page.title()
        print(f"Page Title: {title}")
        results["title"] = title
        assert "Give Your AI Agent 1M+ UI Styles" in title, f"Unexpected title: {title}"

        # 1. VERIFY NO COMPONENT CARDS OR GRIDS
        top12_heading_count = page.locator("text=/SEE IT LIVE — TOP 12 ORIGINALS/i").count()
        top12_sec_count = page.locator("#showcase").count()
        component_cards = page.locator("button:has-text('npx zeuralabz add aurora')").count()
        code_buttons = page.locator("button:has-text('CODE ➔')").count()

        print(f"Top 12 Heading count: {top12_heading_count}")
        print(f"Showcase section count: {top12_sec_count}")
        print(f"Component add buttons: {component_cards}")
        print(f"Component code buttons: {code_buttons}")

        assert top12_heading_count == 0, "Top 12 heading still present!"
        assert top12_sec_count == 0, "#showcase section still present!"
        assert component_cards == 0, "Component add buttons still present!"
        assert code_buttons == 0, "Component code buttons still present!"
        print("✔ Verified: ZERO component cards, grids, or add buttons on homepage!")

        # Verify NO Catalog Search or Pagination
        search_inputs = page.locator("input[placeholder*='Search']").count()
        pagination_text = page.locator("text=/Showing \\d+–\\d+ of \\d+/i").count()
        assert search_inputs == 0, "Catalog search bar still present!"
        assert pagination_text == 0, "Pagination text still present!"
        print("✔ Verified: No search bar or pagination.")

        # Capture Desktop Hero
        hero_shot = os.path.join(ARTIFACT_DIR, "showcase-hero-desktop.png")
        page.screenshot(path=hero_shot)
        print(f"Saved: {hero_shot}")

        # Test Engine Switcher (Allowed Hero Feature)
        print("Testing Engine Switcher (Aurora / Galaxy / Particles / Gradient)...")
        for engine in ["galaxy", "particles", "gradient", "aurora"]:
            btn = page.locator(f"button:has-text('{engine}')").first
            btn.click()
            page.wait_for_timeout(600)
            engine_shot = os.path.join(ARTIFACT_DIR, f"showcase-engine-{engine}.png")
            page.locator("canvas").first.screenshot(path=engine_shot)
            print(f"✔ Switched to {engine} and captured: {engine_shot}")

        # Verify Sections in Order: Hero -> What is it? -> How it works -> What's it for? -> Demo -> Connected Sources -> Install -> Templates -> FAQ -> Footer
        sections = [
            ("what-is-it", "WHAT IS THE ZEURALABZ SKILL?"),
            ("how-it-works", "HOW IT WORKS"),
            ("whats-it-for", "WHAT'S IT FOR?"),
            ("demo", "SEE THE SKILL IN ACTION"),
            ("connected-sources", "HOW MANY OPEN SOURCE ANIMATIONS ARE CONNECTED?"),
            ("install", "INSTALL IN YOUR AI WORKSPACE"),
            ("templates", "STARTER TEMPLATES"),
            ("faq", "FREQUENTLY ASKED QUESTIONS"),
        ]

        for sec_id, heading in sections:
            sec = page.locator(f"#{sec_id}")
            assert sec.count() > 0, f"Section #{sec_id} not found!"
            assert heading.lower() in sec.text_content().lower(), f"Heading '{heading}' not in section #{sec_id}"
            print(f"✔ Verified section #{sec_id}: '{heading}'")

        # Capture #demo (SEE THE SKILL IN ACTION)
        demo_sec = page.locator("#demo")
        demo_shot = os.path.join(ARTIFACT_DIR, "showcase-skill-in-action.png")
        demo_sec.screenshot(path=demo_shot)
        print(f"Saved: {demo_shot}")

        # Verify buttons in #demo
        suggest_btn = demo_sec.locator("button:has-text('TRY npx zeuralabz suggest')")
        github_btn = demo_sec.locator("a:has-text('VIEW ON GITHUB')")
        assert suggest_btn.count() > 0, "Suggest button missing in #demo!"
        assert github_btn.count() > 0, "GitHub button missing in #demo!"
        print("✔ Verified: Both action buttons present in 'SEE THE SKILL IN ACTION'.")

        # Capture full desktop page top to bottom
        full_desktop_shot = os.path.join(ARTIFACT_DIR, "showcase-full-desktop-no-grid.png")
        page.screenshot(path=full_desktop_shot, full_page=True)
        print(f"Saved full desktop screenshot: {full_desktop_shot}")

        # Verify Connected Sources numbers & 1M+ math
        sources_sec = page.locator("#connected-sources")
        sec_text = sources_sec.text_content()
        assert "218" in sec_text, "React Bits 218 not in connected sources!"
        assert "79" in sec_text, "Magic UI 79 not in connected sources!"
        assert "114" in sec_text, "Aceternity UI 114 not in connected sources!"
        assert "120" in sec_text, "Originals 120 not in connected sources!"
        assert "1,000,000+ styles" in sec_text or "1,000,000+" in sec_text, "1M+ styles math not present!"
        print("✔ Verified connected sources counts: 218 + 79 + 114 + 120 = 531 base components and 1M+ math.")

        # Test Interactive Generator
        print("Testing Generator on-demand combination...")
        selects = page.locator("#connected-sources select")
        selects.nth(0).select_option("galaxy")
        selects.nth(1).select_option("cyberpunk")
        selects.nth(2).select_option("pulse")
        page.wait_for_timeout(500)
        variant_text = page.locator("text='galaxy-cyberpunk-pulse'")
        assert variant_text.count() > 0, "Generator did not update variant name!"
        print("✔ Verified on-demand generator compilation: 'galaxy-cyberpunk-pulse'")

        # 2. Mobile Viewport (390x844 - iPhone 12/13/14)
        print("\n--- Mobile Testing (390px Viewport) ---")
        mobile_page = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_page.goto(target_url, wait_until="networkidle")
        mobile_page.wait_for_timeout(2000)

        # Check Horizontal Overflow
        scroll_width = mobile_page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = mobile_page.evaluate("() => window.innerWidth")
        print(f"Mobile 390px - scrollWidth: {scroll_width}, innerWidth: {inner_width}")
        assert scroll_width <= inner_width, f"Mobile horizontal overflow! scrollWidth={scroll_width} > innerWidth={inner_width}"
        print("✔ Verified: Zero horizontal scroll at 390px!")

        # Check 360px (small Android)
        mobile_page.set_viewport_size({"width": 360, "height": 740})
        mobile_page.wait_for_timeout(500)
        scroll_width_360 = mobile_page.evaluate("() => document.documentElement.scrollWidth")
        assert scroll_width_360 <= 360, f"Horizontal overflow at 360px! scrollWidth={scroll_width_360}"
        print("✔ Verified: Zero horizontal scroll at 360px!")

        # Reset back to 390px for screenshots
        mobile_page.set_viewport_size({"width": 390, "height": 844})
        mobile_page.wait_for_timeout(500)

        # Capture full mobile page top to bottom
        mob_full_shot = os.path.join(ARTIFACT_DIR, "showcase-mobile-390-full.png")
        mobile_page.screenshot(path=mob_full_shot, full_page=True)
        print(f"Saved: {mob_full_shot}")

        browser.close()

    if server_process:
        print("Stopping preview server...")
        server_process.terminate()

    print("\nAll Showcase Landing verification checks passed successfully!")

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else None
    run_verification(url)
