import urllib.request
import re
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup

def categorize(slug, title, desc):
    text = f"{slug} {title} {desc}".lower()
    if any(k in text for k in ['background', 'beams', 'sparkle', 'boxes', 'stars', 'ripple', 'gradient', 'aurora', 'wavy', 'galaxy', 'grid', 'dither', 'vortex', 'meteor']):
        if 'card' in slug:
            return 'cards'
        return 'backgrounds'
    if any(k in text for k in ['button', 'shimmer-button', 'moving-border', 'hover-border']):
        return 'buttons'
    if any(k in text for k in ['card', 'pin', 'hover-effect', 'tooltip', '3d-card', 'focus-cards', 'deck', 'testimonial']):
        return 'cards'
    if any(k in text for k in ['text', 'typewriter', 'flip-words', 'word', 'scramble', 'highlight', 'colourful-text']):
        return 'text-animations'
    if any(k in text for k in ['hero', 'parallax', 'macbook', 'lamp', 'header', 'banner']):
        return 'heroes'
    if any(k in text for k in ['layout', 'bento', 'sidebar', 'dock', 'tabs', 'carousel', 'timeline', 'floating-dock']):
        return 'layouts'
    if any(k in text for k in ['input', 'form', 'signup', 'login', 'vanish']):
        return 'forms'
    if any(k in text for k in ['loader', 'spinner', 'skeleton', 'progress']):
        return 'loaders'
    return 'animations'

def fetch_single_component(slug):
    url = f"https://ui.aceternity.com/components/{slug}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            comp_html = resp.read().decode('utf-8')
        
        comp_soup = BeautifulSoup(comp_html, 'html.parser')
        
        # Title
        h1 = comp_soup.find('h1')
        name = h1.get_text(strip=True) if h1 else slug.replace('-', ' ').title()
        
        # Description
        desc_el = comp_soup.find('meta', attrs={'name': 'description'}) or comp_soup.find('meta', attrs={'property': 'og:description'})
        desc = desc_el['content'].strip() if desc_el and desc_el.get('content') else f"Aceternity {name} component for React and Tailwind CSS."
        
        # Check for shadcn install command
        shadcn_match = re.search(r'npx\s+shadcn@latest\s+add\s+(@aceternity/[a-zA-Z0-9\-]+|https://[^\s\"\']+)', comp_html)
        if shadcn_match:
            install_cmd = f"npx shadcn@latest add {shadcn_match.group(1)}"
        else:
            install_cmd = f"npx shadcn@latest add @aceternity/{slug}"
            
        category = categorize(slug, name, desc)
        
        tags = [category, 'aceternity', 'framer-motion', 'tailwind']
        if '3d' in slug: tags.append('3d')
        if 'card' in slug: tags.append('card')
        if 'bg' in slug or 'background' in slug: tags.append('background')
        
        return {
            "id": f"aceternity-{slug}",
            "name": name,
            "slug": slug,
            "source": "aceternity",
            "sourceLabel": "Aceternity UI • MIT",
            "author": "Aceternity UI (Manu Arora)",
            "category": category,
            "description": desc,
            "tags": list(set(tags)),
            "bestFor": [category.replace('-', ' ').title(), "Landing pages", "Modern SaaS"],
            "theme": "dark-neo",
            "license": "MIT",
            "originalUrl": url,
            "previewUrl": url,
            "installCommand": install_cmd,
            "zeuralabzCommand": f"npx zeuralabz add {slug} --source aceternity",
            "deps": ["framer-motion", "clsx", "tailwind-merge"],
            "isOriginal": False
        }
    except Exception as e:
        category = categorize(slug, slug.replace('-', ' ').title(), "")
        return {
            "id": f"aceternity-{slug}",
            "name": slug.replace('-', ' ').title(),
            "slug": slug,
            "source": "aceternity",
            "sourceLabel": "Aceternity UI • MIT",
            "author": "Aceternity UI (Manu Arora)",
            "category": category,
            "description": f"Modern {slug.replace('-', ' ')} component by Aceternity UI.",
            "tags": [category, 'aceternity'],
            "bestFor": ["Landing pages"],
            "theme": "dark-neo",
            "license": "MIT",
            "originalUrl": url,
            "previewUrl": url,
            "installCommand": f"npx shadcn@latest add @aceternity/{slug}",
            "zeuralabzCommand": f"npx zeuralabz add {slug} --source aceternity",
            "deps": ["framer-motion", "clsx", "tailwind-merge"],
            "isOriginal": False
        }

def fetch_all():
    catalog_url = "https://ui.aceternity.com/components"
    req = urllib.request.Request(catalog_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')

    soup = BeautifulSoup(html, 'html.parser')
    seen = set()
    slug_order = []
    
    for a in soup.find_all('a', href=re.compile(r'^/components/[a-zA-Z0-9\-]+$')):
        slug = a['href'].split('/')[-1]
        if slug not in seen:
            seen.add(slug)
            slug_order.append(slug)

    print(f"Discovered {len(slug_order)} unique Aceternity component slugs.")
    sys.stdout.flush()

    registry_dict = {}
    
    with ThreadPoolExecutor(max_workers=12) as executor:
        future_to_slug = {executor.submit(fetch_single_component, slug): slug for slug in slug_order}
        completed = 0
        for future in as_completed(future_to_slug):
            slug = future_to_slug[future]
            try:
                data = future.result()
                registry_dict[slug] = data
                completed += 1
                if completed % 15 == 0 or completed == len(slug_order):
                    print(f"Progress: [{completed}/{len(slug_order)}] fetched.")
                    sys.stdout.flush()
            except Exception as exc:
                print(f"Slug {slug} generated exception: {exc}")
                sys.stdout.flush()

    # Re-order to match original order
    ordered_registry = [registry_dict[slug] for slug in slug_order if slug in registry_dict]

    # Save to registry/aceternity.json
    out_path = r"D:\MY PROJECTS\ZEURALABZ\registry\aceternity.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(ordered_registry, f, indent=2)

    print(f"\nSuccessfully generated {out_path} with {len(ordered_registry)} components.")
    
    category_counts = {}
    for item in ordered_registry:
        c = item['category']
        category_counts[c] = category_counts.get(c, 0) + 1
        
    print("Category breakdown:")
    for cat, count in sorted(category_counts.items(), key=lambda x: -x[1]):
        print(f"  • {cat}: {count}")
    sys.stdout.flush()

if __name__ == "__main__":
    fetch_all()
