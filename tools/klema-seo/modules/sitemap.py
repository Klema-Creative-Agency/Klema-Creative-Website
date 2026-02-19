"""
Module 7 — Sitemap Analysis
==============================
Checks: sitemap.xml existence, format, URL count, lastmod dates,
changefreq, consistency with crawled pages, sitemap index support.
"""

import re
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from utils.crawler import CrawlResult, Crawler
from utils.scoring import score_category


def analyze(page: CrawlResult, sitemap_xml: str = "",
            all_pages: list = None, robots_txt: str = "") -> dict:
    """Run sitemap analysis."""
    checks = []
    all_pages = all_pages or []

    # ── 1. Sitemap exists ─────────────────────────────────
    has_sitemap = bool(sitemap_xml.strip())
    checks.append({
        "name": "sitemap.xml exists",
        "passed": has_sitemap,
        "weight": 1.0,
        "severity": "critical",
        "message": "sitemap.xml found" if has_sitemap else "No sitemap.xml at /sitemap.xml",
        "recommendation": "" if has_sitemap else (
            "Create a sitemap.xml file listing all important pages. "
            "Submit it to Google Search Console."
        ),
    })

    if not has_sitemap:
        # Still provide basic recommendations
        checks.append({
            "name": "Sitemap in robots.txt",
            "passed": False,
            "weight": 0.5,
            "severity": "warning",
            "message": "Cannot check — no sitemap found",
            "recommendation": "After creating a sitemap, reference it in robots.txt: Sitemap: https://yoursite.com/sitemap.xml",
        })
        return score_category(checks)

    # Parse sitemap
    sitemap_soup = BeautifulSoup(sitemap_xml, "lxml-xml")
    urls = sitemap_soup.find_all("url")
    sitemap_index = sitemap_soup.find_all("sitemap")

    is_index = len(sitemap_index) > 0
    url_count = len(urls) if not is_index else len(sitemap_index)

    # ── 2. Valid XML format ───────────────────────────────
    valid_xml = (len(urls) > 0 or len(sitemap_index) > 0)
    checks.append({
        "name": "Valid sitemap XML format",
        "passed": valid_xml,
        "weight": 0.9,
        "severity": "critical",
        "message": f"{'Sitemap index' if is_index else 'Sitemap'} with {url_count} entries",
        "recommendation": "" if valid_xml else "Sitemap XML appears malformed. Validate at https://www.xml-sitemaps.com/validate-xml-sitemap.html",
    })

    # ── 3. Has <loc> tags ─────────────────────────────────
    locs = [u.find("loc").text for u in urls if u.find("loc")] if urls else []
    has_locs = len(locs) > 0
    checks.append({
        "name": "URLs listed with <loc> tags",
        "passed": has_locs,
        "weight": 0.8,
        "severity": "critical",
        "message": f"{len(locs)} URLs in sitemap",
        "recommendation": "" if has_locs else "Ensure each <url> entry has a <loc> with the full URL.",
    })

    # ── 4. Has <lastmod> dates ────────────────────────────
    lastmod_count = sum(1 for u in urls if u.find("lastmod"))
    lastmod_ratio = lastmod_count / len(urls) if urls else 0
    lastmod_ok = lastmod_ratio >= 0.8
    checks.append({
        "name": "Last modified dates present",
        "passed": lastmod_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"{lastmod_count}/{len(urls)} URLs have <lastmod>",
        "recommendation": "" if lastmod_ok else "Add <lastmod> dates to sitemap entries to help search engines prioritize crawling fresh content.",
    })

    # ── 5. Crawled pages in sitemap ───────────────────────
    if locs and all_pages:
        crawled_urls = {p.url.rstrip("/") for p in all_pages if p.ok}
        sitemap_urls = {loc.rstrip("/") for loc in locs}
        missing_from_sitemap = crawled_urls - sitemap_urls
        missing_ratio = len(missing_from_sitemap) / len(crawled_urls) if crawled_urls else 0
        coverage_ok = missing_ratio < 0.3
        checks.append({
            "name": "Crawled pages covered in sitemap",
            "passed": coverage_ok,
            "weight": 0.7,
            "severity": "warning",
            "message": f"{len(missing_from_sitemap)} crawled pages not in sitemap" if missing_from_sitemap else "All crawled pages found in sitemap",
            "recommendation": "" if coverage_ok else (
                f"{len(missing_from_sitemap)} accessible pages are missing from your sitemap. "
                "Ensure all important pages are included."
            ),
        })

    # ── 6. No 404s in sitemap ─────────────────────────────
    # We can't check all URLs, but flag known 404 pages
    if locs and all_pages:
        broken_urls = {p.url.rstrip("/") for p in all_pages if p.status_code == 404}
        broken_in_sitemap = broken_urls & {loc.rstrip("/") for loc in locs}
        no_broken = len(broken_in_sitemap) == 0
        checks.append({
            "name": "No broken URLs in sitemap",
            "passed": no_broken,
            "weight": 0.8,
            "severity": "critical",
            "message": f"{len(broken_in_sitemap)} broken URLs found in sitemap" if broken_in_sitemap else "No broken URLs detected in sitemap",
            "recommendation": "" if no_broken else "Remove 404 URLs from your sitemap. Broken URLs waste crawl budget.",
        })

    # ── 7. Reasonable URL count ───────────────────────────
    reasonable = url_count <= 50000
    checks.append({
        "name": "URL count within limits",
        "passed": reasonable,
        "weight": 0.3,
        "severity": "info",
        "message": f"{url_count} URLs (limit: 50,000 per sitemap)",
        "recommendation": "" if reasonable else "Sitemap exceeds 50,000 URL limit. Split into multiple sitemaps using a sitemap index.",
    })

    # ── 8. Sitemap referenced in robots.txt ───────────────
    sitemap_in_robots = "sitemap:" in robots_txt.lower() if robots_txt else False
    checks.append({
        "name": "Referenced in robots.txt",
        "passed": sitemap_in_robots,
        "weight": 0.4,
        "severity": "warning",
        "message": "Sitemap referenced in robots.txt" if sitemap_in_robots else "Sitemap not mentioned in robots.txt",
        "recommendation": "" if sitemap_in_robots else "Add 'Sitemap: https://yoursite.com/sitemap.xml' to robots.txt for discovery.",
    })

    return score_category(checks)
