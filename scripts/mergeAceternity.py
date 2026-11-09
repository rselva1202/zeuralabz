import json
import os

def merge():
    root_comp_path = r"D:\MY PROJECTS\ZEURALABZ\components.json"
    site_comp_path = r"D:\MY PROJECTS\ZEURALABZ\preview-site\src\data\components.json"
    aceternity_path = r"D:\MY PROJECTS\ZEURALABZ\registry\aceternity.json"

    with open(root_comp_path, 'r', encoding='utf-8') as f:
        existing = json.load(f)

    with open(aceternity_path, 'r', encoding='utf-8') as f:
        aceternity = json.load(f)

    # Filter out any old aceternity entries if present
    base = [c for c in existing if c.get('source') != 'aceternity']
    merged = base + aceternity

    with open(root_comp_path, 'w', encoding='utf-8') as f:
        json.dump(merged, f, indent=2)

    with open(site_comp_path, 'w', encoding='utf-8') as f:
        json.dump(merged, f, indent=2)

    # Calculate statistics
    sources = {}
    for c in merged:
        s = c.get('source', 'zeuralabz-original')
        sources[s] = sources.get(s, 0) + 1

    print(f"Successfully merged {len(merged)} total components.")
    print("Source counts:")
    for src, count in sources.items():
        print(f"  • {src}: {count}")

if __name__ == "__main__":
    merge()
