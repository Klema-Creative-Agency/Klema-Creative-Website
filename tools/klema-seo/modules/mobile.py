"""
Module 11 — Mobile UX Analysis
=================================
Checks: Viewport meta, touch targets, font sizes, responsive signals,
mobile-specific meta, AMP detection, tap targets.
"""

import re
from utils.crawler import CrawlResult, extract_meta
from utils.scoring import score_category


def analyze(page: CrawlResult) -> dict:
    """Run mobile UX analysis."""
    if not page.soup:
        return score_category([])

    checks = []
    meta = extract_meta(page.soup)

    # ── 1. Viewport meta tag ──────────────────────────────
    viewport = meta.get("viewport", "")
    has_viewport = bool(viewport)
    viewport_correct = "width=device-width" in viewport if viewport else False
    checks.append({
        "name": "Viewport meta tag configured",
        "passed": has_viewport and viewport_correct,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Viewport: {viewport}" if has_viewport else "No viewport meta tag",
        "recommendation": "" if (has_viewport and viewport_correct) else (
            "Add <meta name='viewport' content='width=device-width, initial-scale=1'>. "
            "This is required for mobile-first indexing."
        ),
    })

    # ── 2. No fixed-width elements ────────────────────────
    # Check for common fixed-width patterns in inline styles
    fixed_width = False
    for tag in page.soup.find_all(style=True):
        style = tag.get("style", "")
        if re.search(r'width:\s*\d{4,}px', style):
            fixed_width = True
            break
    checks.append({
        "name": "No fixed-width elements",
        "passed": not fixed_width,
        "weight": 0.7,
        "severity": "warning",
        "message": "No overly wide fixed elements detected" if not fixed_width else "Fixed-width elements found that may overflow on mobile",
        "recommendation": "" if not fixed_width else "Replace fixed pixel widths (1000px+) with responsive units (%, vw, max-width).",
    })

    # ── 3. Legible font sizes ─────────────────────────────
    # Check for very small font sizes in inline styles
    small_fonts = False
    for tag in page.soup.find_all(style=True):
        style = tag.get("style", "")
        match = re.search(r'font-size:\s*(\d+)', style)
        if match and int(match.group(1)) < 10:
            small_fonts = True
            break
    checks.append({
        "name": "Legible font sizes",
        "passed": not small_fonts,
        "weight": 0.6,
        "severity": "warning",
        "message": "No tiny font sizes detected" if not small_fonts else "Very small font sizes found",
        "recommendation": "" if not small_fonts else "Ensure body text is at least 14px/1rem for mobile readability.",
    })

    # ── 4. Touch-friendly elements ────────────────────────
    # Check for very small buttons/links
    small_targets = 0
    for tag in page.soup.find_all(["button", "a", "input"]):
        style = tag.get("style", "")
        # Check inline sizing
        height_match = re.search(r'height:\s*(\d+)px', style)
        if height_match and int(height_match.group(1)) < 30:
            small_targets += 1
    targets_ok = small_targets <= 2
    checks.append({
        "name": "Touch-friendly tap targets",
        "passed": targets_ok,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{small_targets} potentially small tap targets" if small_targets else "Tap targets appear adequately sized",
        "recommendation": "" if targets_ok else "Ensure buttons and links are at least 44x44px for easy tapping on mobile devices.",
    })

    # ── 5. Click-to-call link ─────────────────────────────
    has_tel = False
    for a in page.soup.find_all("a", href=True):
        if a["href"].startswith("tel:"):
            has_tel = True
            break
    checks.append({
        "name": "Click-to-call link for mobile",
        "passed": has_tel,
        "weight": 0.8,
        "severity": "warning",
        "message": "tel: link found" if has_tel else "No click-to-call link",
        "recommendation": "" if has_tel else (
            "Add a clickable phone number link: <a href='tel:+1XXXYYYZZZZ'>. "
            "Essential for local businesses on mobile."
        ),
    })

    # ── 6. Responsive images ──────────────────────────────
    images = page.soup.find_all("img")
    oversized = 0
    for img in images:
        width = img.get("width", "")
        if width and width.isdigit() and int(width) > 1200:
            oversized += 1
    images_ok = oversized == 0
    checks.append({
        "name": "Images mobile-appropriate",
        "passed": images_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"{oversized} potentially oversized images" if oversized else "Image dimensions appear mobile-friendly",
        "recommendation": "" if images_ok else "Use srcset or max-width:100% to serve appropriately sized images on mobile.",
    })

    # ── 7. No horizontal scroll indicators ────────────────
    tables = page.soup.find_all("table")
    has_tables = len(tables) > 0
    # Tables without overflow wrappers can cause horizontal scroll
    checks.append({
        "name": "Tables are responsive",
        "passed": not has_tables or len(tables) <= 1,
        "weight": 0.4,
        "severity": "info",
        "message": f"{len(tables)} table(s) found" if has_tables else "No tables (no horizontal scroll risk)",
        "recommendation": "" if not has_tables else "Wrap tables in overflow-x:auto containers for mobile. Consider card layouts instead.",
    })

    # ── 8. Mobile-specific meta tags ─────────────────────
    apple_meta = page.soup.find("meta", attrs={"name": "apple-mobile-web-app-capable"})
    theme_color = page.soup.find("meta", attrs={"name": "theme-color"})
    has_mobile_meta = bool(apple_meta) or bool(theme_color)
    checks.append({
        "name": "Mobile-specific meta tags",
        "passed": has_mobile_meta,
        "weight": 0.3,
        "severity": "info",
        "message": "Mobile-specific meta tags found" if has_mobile_meta else "No mobile-specific meta tags",
        "recommendation": "" if has_mobile_meta else "Add theme-color meta tag for a branded mobile browser experience.",
    })

    return score_category(checks)
