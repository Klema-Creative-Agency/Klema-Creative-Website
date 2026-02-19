"""
Module 9 — Competitor Page Analysis
======================================
Analyzes the client's site against competitors found in the same space.
Checks: Content comparison, schema coverage, page structure, local signals.
"""

from urllib.parse import urlparse
from utils.crawler import CrawlResult, Crawler, extract_meta, extract_headings
from utils.crawler import extract_structured_data, extract_images, word_count
from utils.scoring import score_category


def analyze(page: CrawlResult, competitor_urls: list = None) -> dict:
    """
    Compare the client's page against competitor pages.

    If competitor_urls is empty, this module provides recommendations
    for competitive analysis instead.
    """
    checks = []

    if not page.soup:
        return score_category([])

    client_data = _extract_page_data(page)

    if not competitor_urls:
        # No competitors provided — give guidance
        checks.append({
            "name": "Competitor URLs provided",
            "passed": False,
            "weight": 0.5,
            "severity": "info",
            "message": "No competitor URLs provided for comparison",
            "recommendation": (
                "Provide 2-3 competitor URLs to enable head-to-head comparison. "
                "Search your main keywords and pick the top-ranking local businesses."
            ),
        })

        # Still analyze the client page for competitive readiness
        _add_readiness_checks(checks, client_data)
        return score_category(checks)

    # Crawl competitor pages
    crawler = Crawler()
    competitor_data = []
    for url in competitor_urls[:3]:
        result = crawler.fetch(url)
        if result.ok and result.soup:
            competitor_data.append({
                "url": url,
                "data": _extract_page_data(result),
            })

    if not competitor_data:
        checks.append({
            "name": "Competitor pages accessible",
            "passed": False,
            "weight": 0.5,
            "severity": "info",
            "message": "Could not access any competitor pages",
            "recommendation": "Verify competitor URLs are accessible. Try different competitor pages.",
        })
        _add_readiness_checks(checks, client_data)
        return score_category(checks)

    # ── Compare: Content depth ────────────────────────────
    client_wc = client_data["word_count"]
    avg_comp_wc = sum(c["data"]["word_count"] for c in competitor_data) / len(competitor_data)
    content_competitive = client_wc >= avg_comp_wc * 0.8
    checks.append({
        "name": "Content depth vs competitors",
        "passed": content_competitive,
        "weight": 0.8,
        "severity": "warning",
        "message": f"Your page: ~{client_wc} words | Competitor avg: ~{int(avg_comp_wc)} words",
        "recommendation": "" if content_competitive else (
            f"Competitors average ~{int(avg_comp_wc)} words. "
            f"Your page has ~{client_wc}. Add more comprehensive, helpful content."
        ),
    })

    # ── Compare: Schema markup ────────────────────────────
    client_schemas = len(client_data["schemas"])
    avg_comp_schemas = sum(len(c["data"]["schemas"]) for c in competitor_data) / len(competitor_data)
    schema_competitive = client_schemas >= avg_comp_schemas
    checks.append({
        "name": "Schema markup vs competitors",
        "passed": schema_competitive,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Your schemas: {client_schemas} | Competitor avg: {avg_comp_schemas:.1f}",
        "recommendation": "" if schema_competitive else (
            "Competitors have more structured data. Add relevant schema types "
            "to match or exceed their markup."
        ),
    })

    # ── Compare: Title tag quality ────────────────────────
    client_title_len = len(client_data["title"])
    comp_title_lens = [len(c["data"]["title"]) for c in competitor_data]
    avg_comp_title = sum(comp_title_lens) / len(comp_title_lens) if comp_title_lens else 0
    title_ok = 30 <= client_title_len <= 65
    checks.append({
        "name": "Title optimization vs competitors",
        "passed": title_ok,
        "weight": 0.6,
        "severity": "warning",
        "message": f"Your title: {client_title_len} chars | Competitor avg: {int(avg_comp_title)} chars",
        "recommendation": "" if title_ok else "Optimize your title tag to 30-65 characters with primary keyword.",
    })

    # ── Compare: Image optimization ───────────────────────
    client_img_alt = client_data["images_with_alt"]
    client_img_total = client_data["total_images"]
    client_alt_ratio = client_img_alt / client_img_total if client_img_total else 1.0

    comp_alt_ratios = []
    for c in competitor_data:
        total = c["data"]["total_images"]
        with_alt = c["data"]["images_with_alt"]
        if total:
            comp_alt_ratios.append(with_alt / total)

    avg_comp_alt = sum(comp_alt_ratios) / len(comp_alt_ratios) if comp_alt_ratios else 0
    img_competitive = client_alt_ratio >= avg_comp_alt
    checks.append({
        "name": "Image optimization vs competitors",
        "passed": img_competitive,
        "weight": 0.5,
        "severity": "info",
        "message": f"Your alt text coverage: {client_alt_ratio:.0%} | Competitor avg: {avg_comp_alt:.0%}",
        "recommendation": "" if img_competitive else "Competitors have better image alt text coverage. Add descriptive alt text to all images.",
    })

    # ── Compare: Heading structure ────────────────────────
    client_h2 = client_data["h2_count"]
    avg_comp_h2 = sum(c["data"]["h2_count"] for c in competitor_data) / len(competitor_data)
    headings_competitive = client_h2 >= avg_comp_h2 * 0.7
    checks.append({
        "name": "Content structure vs competitors",
        "passed": headings_competitive,
        "weight": 0.5,
        "severity": "info",
        "message": f"Your H2 headings: {client_h2} | Competitor avg: {avg_comp_h2:.1f}",
        "recommendation": "" if headings_competitive else (
            "Competitors use more structured headings. Add H2 sections to better "
            "organize your content and target more keywords."
        ),
    })

    return score_category(checks)


def _extract_page_data(page: CrawlResult) -> dict:
    """Extract comparison data points from a page."""
    meta = extract_meta(page.soup)
    headings = extract_headings(page.soup)
    images = extract_images(page.soup, page.url)
    schemas = extract_structured_data(page.soup)

    return {
        "title": meta.get("title", ""),
        "description": meta.get("description", ""),
        "word_count": word_count(page.soup),
        "h2_count": len(headings.get("h2", [])),
        "total_images": len(images),
        "images_with_alt": sum(1 for img in images if img["has_alt"]),
        "schemas": schemas,
        "schema_types": [s.get("@type", "") for s in schemas],
    }


def _add_readiness_checks(checks: list, client_data: dict):
    """Add competitive readiness checks when no competitors are provided."""
    checks.append({
        "name": "Content depth competitive-ready",
        "passed": client_data["word_count"] >= 600,
        "weight": 0.7,
        "severity": "warning",
        "message": f"~{client_data['word_count']} words (600+ recommended for competitive pages)",
        "recommendation": "" if client_data["word_count"] >= 600 else "Aim for 600+ words of content to compete in local search results.",
    })

    checks.append({
        "name": "Schema markup present",
        "passed": len(client_data["schemas"]) >= 2,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{len(client_data['schemas'])} schema objects (2+ recommended)",
        "recommendation": "" if len(client_data["schemas"]) >= 2 else "Add at least LocalBusiness and WebSite schema to be competitive.",
    })

    checks.append({
        "name": "Heading structure depth",
        "passed": client_data["h2_count"] >= 3,
        "weight": 0.5,
        "severity": "info",
        "message": f"{client_data['h2_count']} H2 headings (3+ recommended for competitive pages)",
        "recommendation": "" if client_data["h2_count"] >= 3 else "Use 3+ H2 headings to structure content by topic. Target different keyword variations.",
    })
