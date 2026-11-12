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

        # Verify NO Catalog Search or Pagination
        search_inputs = page.locator("input[placeholder*='Search']").count()
        pagination_text = page.locator("text=/Showing \\d+–\\d+ of \\d+/i").count()
        assert search_inputs == 0, "Catalog search bar still present on showcase page!"
        assert pagination_text == 0, "Pagination text still present on showcase page!"
        print("✔ Verified: No search bar or pagination on showcase landing page.")

        # Capture Desktop Hero
        hero_shot = os.path.join(ARTIFACT_DIR, "showcase-hero-desktop.png")
        page.screenshot(path=hero_shot)
        print(f"Saved: {hero_shot}")

        # Test Engine Switcher
        print("Testing Engine Switcher (Aurora / Galaxy / Particles / Gradient)...")
        for engine in ["galaxy", "particles", "gradient", "aurora"]:
            btn = page.locator(f"button:has-text('{engine}')").first
            btn.click()
            page.wait_for_timeout(600)
            engine_shot = os.path.join(ARTIFACT_DIR, f"showcase-engine-{engine}.png")
            page.locator("canvas").first.screenshot(path=engine_shot)
            print(f"✔ Switched to {engine} and captured: {engine_shot}")

        # Verify Sections in Order
        sections = [
            ("what-is-it", "WHAT IS THE ZEURALABZ SKILL?"),
            ("how-it-works", "HOW IT WORKS"),
            ("whats-it-for", "WHAT'S IT FOR?"),
            ("showcase", "SEE IT LIVE — TOP 12 ORIGINALS"),
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

        # Capture What is it & How it works
        page.locator("#what-is-it").screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-what-is-it.png"))
        page.locator("#how-it-works").screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-how-it-works.png"))

        # Verify Showcase has EXACTLY 12 cards and 0 fake previews
        showcase_cards = page.locator("#showcase .group")
        card_count = showcase_cards.count()
        print(f"Top 12 Showcase card count: {card_count}")
        assert card_count == 12, f"Expected 12 showcase cards, found {card_count}!"

        # Check that no card has the old placeholder text
        sparkle_matches = page.locator("text='@react-bits • LIVE DEMO'").count()
        assert sparkle_matches == 0, "Fake placeholder badge '@react-bits • LIVE DEMO' found!"
        print("✔ Verified: Exactly 12 real original cards in showcase, 0 fake placeholders.")

        page.locator("#showcase").screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-top12.png"))

        # Verify Connected Sources numbers & 1M+ math
        sources_sec = page.locator("#connected-sources")
        sec_text = sources_sec.text_content()
        assert "218" in sec_text, "React Bits 218 not in connected sources!"
        assert "79" in sec_text, "Magic UI 79 not in connected sources!"
        assert "114" in sec_text, "Aceternity UI 114 not in connected sources!"
        assert "120" in sec_text, "Originals 120 not in connected sources!"
        assert "1,000,000+ styles" in sec_text or "1,000,000+" in sec_text, "1M+ styles math not present!"
        print("✔ Verified connected sources counts: 218 + 79 + 114 + 120 = 531 base components and 1M+ math.")

        sources_sec.screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-connected-sources-math.png"))

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

        # Capture Install & Templates
        page.locator("#install").screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-install.png"))
        page.locator("#templates").screenshot(path=os.path.join(ARTIFACT_DIR, "showcase-templates.png"))

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

        mob_hero_shot = os.path.join(ARTIFACT_DIR, "showcase-mobile-390-hero.png")
        mobile_page.screenshot(path=mob_hero_shot)
        print(f"Saved: {mob_hero_shot}")

        # Scroll down to Top 12 on mobile
        mobile_page.locator("#showcase").scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(1000)
        mob_top12_shot = os.path.join(ARTIFACT_DIR, "showcase-mobile-390-top12.png")
        mobile_page.locator("#showcase").screenshot(path=mob_top12_shot)
        print(f"Saved: {mob_top12_shot}")

        # Capture full mobile page
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
