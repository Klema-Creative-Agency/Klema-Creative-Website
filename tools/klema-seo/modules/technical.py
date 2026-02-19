"""
Module 1 — Technical SEO Audit
================================
Checks: SSL, response codes, redirects, canonical tags, robots.txt,
crawlability, security headers, page speed indicators, HTTP/2.
"""

from urllib.parse import urlparse
from utils.crawler import CrawlResult, extract_meta
from utils.scoring import score_category


def analyze(page: CrawlResult, robots_txt: str = "", all_pages: list = None) -> dict:
    """Run all technical SEO checks on a page."""
    all_pages = all_pages or []
    checks = []
    meta = extract_meta(page.soup) if page.soup else {}

    # ── 1. HTTPS ──────────────────────────────────────────
    is_https = urlparse(page.url).scheme == "https"
    checks.append({
        "name": "HTTPS enabled",
        "passed": is_https,
        "weight": 1.0,
        "severity": "critical",
        "message": "Site uses HTTPS" if is_https else "Site is NOT using HTTPS",
        "recommendation": "" if is_https else "Install an SSL certificate and redirect all HTTP traffic to HTTPS.",
    })

    # ── 2. Response code ──────────────────────────────────
    good_status = page.status_code == 200
    checks.append({
        "name": "HTTP status 200",
        "passed": good_status,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Status code: {page.status_code}",
        "recommendation": "" if good_status else f"Page returned {page.status_code}. Ensure the homepage returns 200.",
    })

    # ── 3. Page load time ─────────────────────────────────
    fast = page.load_time < 3.0
    checks.append({
        "name": "Server response time < 3s",
        "passed": fast,
        "weight": 0.8,
        "severity": "warning" if not fast else "info",
        "message": f"Server responded in {page.load_time:.2f}s",
        "recommendation": "" if fast else "Optimize server response time. Consider caching, CDN, or upgrading hosting.",
    })

    # ── 4. Canonical tag ──────────────────────────────────
    has_canonical = bool(meta.get("canonical"))
    checks.append({
        "name": "Canonical tag present",
        "passed": has_canonical,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Canonical: {meta.get('canonical', 'missing')}",
        "recommendation": "" if has_canonical else "Add a <link rel='canonical'> tag to prevent duplicate content issues.",
    })

    # ── 5. Robots meta ────────────────────────────────────
    robots_meta = meta.get("robots", "")
    is_indexable = "noindex" not in robots_meta.lower()
    checks.append({
        "name": "Page is indexable",
        "passed": is_indexable,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Robots meta: '{robots_meta}'" if robots_meta else "No robots meta tag (indexable by default)",
        "recommendation": "" if is_indexable else "Remove 'noindex' from robots meta tag if this page should appear in search.",
    })

    # ── 6. robots.txt exists ──────────────────────────────
    has_robots = bool(robots_txt.strip())
    checks.append({
        "name": "robots.txt exists",
        "passed": has_robots,
        "weight": 0.5,
        "severity": "warning",
        "message": "robots.txt found" if has_robots else "No robots.txt detected",
        "recommendation": "" if has_robots else "Create a robots.txt file to guide search engine crawlers.",
    })

    # ── 7. Sitemap referenced in robots.txt ───────────────
    sitemap_in_robots = "sitemap:" in robots_txt.lower() if robots_txt else False
    checks.append({
        "name": "Sitemap in robots.txt",
        "passed": sitemap_in_robots,
        "weight": 0.4,
        "severity": "info",
        "message": "Sitemap referenced in robots.txt" if sitemap_in_robots else "No sitemap reference in robots.txt",
        "recommendation": "" if sitemap_in_robots else "Add 'Sitemap: https://yoursite.com/sitemap.xml' to robots.txt.",
    })

    # ── 8. Security headers ───────────────────────────────
    headers = page.headers
    security_headers = {
        "X-Content-Type-Options": headers.get("X-Content-Type-Options", ""),
        "X-Frame-Options": headers.get("X-Frame-Options", ""),
        "Strict-Transport-Security": headers.get("Strict-Transport-Security", ""),
        "Content-Security-Policy": headers.get("Content-Security-Policy", ""),
    }
    sec_count = sum(1 for v in security_headers.values() if v)
    good_security = sec_count >= 2
    checks.append({
        "name": "Security headers present",
        "passed": good_security,
        "weight": 0.5,
        "severity": "warning",
        "message": f"{sec_count}/4 security headers found: {', '.join(k for k, v in security_headers.items() if v) or 'none'}",
        "recommendation": "" if good_security else "Add security headers: X-Content-Type-Options, X-Frame-Options, HSTS, CSP.",
    })

    # ── 9. Charset declared ───────────────────────────────
    has_charset = bool(meta.get("charset")) or "charset" in headers.get("Content-Type", "").lower()
    checks.append({
        "name": "Character encoding declared",
        "passed": has_charset,
        "weight": 0.3,
        "severity": "info",
        "message": "Charset declared" if has_charset else "No charset declaration found",
        "recommendation": "" if has_charset else "Add <meta charset='utf-8'> to the <head> section.",
    })

    # ── 10. Language attribute ────────────────────────────
    has_lang = bool(meta.get("lang"))
    checks.append({
        "name": "HTML lang attribute",
        "passed": has_lang,
        "weight": 0.4,
        "severity": "warning",
        "message": f"Language: {meta.get('lang', 'not set')}",
        "recommendation": "" if has_lang else "Add lang='en' (or appropriate language) to the <html> tag.",
    })

    # ── 11. No mixed content ──────────────────────────────
    mixed = False
    if page.soup and is_https:
        for tag in page.soup.find_all(["img", "script", "link", "iframe"]):
            src = tag.get("src") or tag.get("href") or ""
            if src.startswith("http://"):
                mixed = True
                break
    checks.append({
        "name": "No mixed content",
        "passed": not mixed,
        "weight": 0.6,
        "severity": "warning",
        "message": "No mixed content detected" if not mixed else "Mixed HTTP/HTTPS content found",
        "recommendation": "" if not mixed else "Update all resource URLs to use HTTPS to avoid mixed content warnings.",
    })

    # ── 12. 404 pages among crawled ───────────────────────
    broken_count = sum(1 for p in all_pages if p.status_code == 404)
    no_broken = broken_count == 0
    checks.append({
        "name": "No broken pages (404s)",
        "passed": no_broken,
        "weight": 0.7,
        "severity": "critical" if broken_count > 3 else "warning",
        "message": f"{broken_count} broken pages found" if broken_count else "No 404 errors detected",
        "recommendation": "" if no_broken else f"Fix or redirect {broken_count} broken URLs returning 404 status codes.",
    })

    return score_category(checks)
