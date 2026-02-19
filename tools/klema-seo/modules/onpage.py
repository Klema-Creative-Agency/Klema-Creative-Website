"""
Module 2 — On-Page SEO Analysis
=================================
Checks: Title tags, meta descriptions, heading hierarchy, keyword presence,
internal linking, URL structure, content length.
"""

import re
from urllib.parse import urlparse
from utils.crawler import CrawlResult, extract_meta, extract_headings, extract_links, word_count
from utils.scoring import score_category


def analyze(page: CrawlResult) -> dict:
    """Run on-page SEO checks."""
    if not page.soup:
        return score_category([])

    checks = []
    meta = extract_meta(page.soup)
    headings = extract_headings(page.soup)
    links = extract_links(page.soup, page.url)

    # ── 1. Title tag exists and good length ───────────────
    title = meta.get("title", "")
    title_len = len(title)
    title_ok = 20 <= title_len <= 65
    checks.append({
        "name": "Title tag optimized",
        "passed": title_ok,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Title ({title_len} chars): '{title[:80]}'" if title else "No title tag found",
        "recommendation": _title_rec(title_len),
    })

    # ── 2. Meta description ───────────────────────────────
    desc = meta.get("description", "")
    desc_len = len(desc)
    desc_ok = 70 <= desc_len <= 160
    checks.append({
        "name": "Meta description optimized",
        "passed": desc_ok,
        "weight": 0.9,
        "severity": "critical" if not desc else "warning",
        "message": f"Description ({desc_len} chars)" if desc else "No meta description found",
        "recommendation": _desc_rec(desc_len),
    })

    # ── 3. Single H1 ─────────────────────────────────────
    h1_count = len(headings.get("h1", []))
    single_h1 = h1_count == 1
    checks.append({
        "name": "Single H1 tag",
        "passed": single_h1,
        "weight": 0.8,
        "severity": "warning",
        "message": f"{h1_count} H1 tag(s) found: {', '.join(headings.get('h1', [])[:3])}",
        "recommendation": "" if single_h1 else "Use exactly one H1 tag per page containing your primary keyword.",
    })

    # ── 4. Heading hierarchy ──────────────────────────────
    has_h2 = len(headings.get("h2", [])) > 0
    hierarchy_ok = h1_count >= 1 and has_h2
    checks.append({
        "name": "Proper heading hierarchy",
        "passed": hierarchy_ok,
        "weight": 0.6,
        "severity": "warning",
        "message": f"H1: {h1_count}, H2: {len(headings.get('h2', []))}, H3: {len(headings.get('h3', []))}",
        "recommendation": "" if hierarchy_ok else "Structure content with H1 → H2 → H3 hierarchy for better SEO and readability.",
    })

    # ── 5. Content length ─────────────────────────────────
    wc = word_count(page.soup)
    content_ok = wc >= 300
    checks.append({
        "name": "Sufficient content length",
        "passed": content_ok,
        "weight": 0.7,
        "severity": "warning",
        "message": f"~{wc} words on page",
        "recommendation": "" if content_ok else f"Page has only ~{wc} words. Aim for 300+ words of quality content for better rankings.",
    })

    # ── 6. Internal links ─────────────────────────────────
    int_links = len(links.get("internal", []))
    has_internal = int_links >= 3
    checks.append({
        "name": "Adequate internal linking",
        "passed": has_internal,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{int_links} internal links found",
        "recommendation": "" if has_internal else "Add more internal links to distribute page authority and improve crawlability.",
    })

    # ── 7. External links ─────────────────────────────────
    ext_links = len(links.get("external", []))
    has_external = ext_links >= 1
    checks.append({
        "name": "Has outbound links",
        "passed": has_external,
        "weight": 0.3,
        "severity": "info",
        "message": f"{ext_links} external links found",
        "recommendation": "" if has_external else "Add relevant outbound links to authoritative sources to build topical trust.",
    })

    # ── 8. URL structure ──────────────────────────────────
    path = urlparse(page.url).path
    url_clean = bool(re.match(r'^[a-z0-9/\-]+$', path.lower()))
    url_short = len(path) < 80
    url_ok = url_clean and url_short
    checks.append({
        "name": "Clean URL structure",
        "passed": url_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"URL path: {path}",
        "recommendation": "" if url_ok else "Use short, keyword-rich URLs with hyphens. Avoid parameters, underscores, and special characters.",
    })

    # ── 9. Open Graph tags ────────────────────────────────
    has_og = bool(meta.get("og_title")) and bool(meta.get("og_description"))
    checks.append({
        "name": "Open Graph tags present",
        "passed": has_og,
        "weight": 0.4,
        "severity": "info",
        "message": "OG title & description found" if has_og else "Open Graph tags missing",
        "recommendation": "" if has_og else "Add og:title, og:description, and og:image for better social media sharing.",
    })

    # ── 10. Viewport meta tag ─────────────────────────────
    has_viewport = bool(meta.get("viewport"))
    checks.append({
        "name": "Viewport meta tag",
        "passed": has_viewport,
        "weight": 0.7,
        "severity": "critical",
        "message": f"Viewport: {meta.get('viewport', 'not set')}",
        "recommendation": "" if has_viewport else "Add <meta name='viewport' content='width=device-width, initial-scale=1'> for mobile optimization.",
    })

    return score_category(checks)


def _title_rec(length: int) -> str:
    if length == 0:
        return "Add a unique, descriptive title tag with your primary keyword (30-65 characters)."
    elif length < 20:
        return f"Title is too short ({length} chars). Expand to 30-65 characters with relevant keywords."
    elif length > 65:
        return f"Title may be truncated ({length} chars). Shorten to 65 characters or fewer."
    return ""


def _desc_rec(length: int) -> str:
    if length == 0:
        return "Add a compelling meta description (120-155 chars) with a call to action and primary keyword."
    elif length < 70:
        return f"Description is short ({length} chars). Expand to 120-155 characters for maximum SERP visibility."
    elif length > 160:
        return f"Description may be truncated ({length} chars). Keep under 155 characters."
    return ""
