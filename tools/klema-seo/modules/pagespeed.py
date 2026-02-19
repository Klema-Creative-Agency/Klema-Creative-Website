"""
Module 10 — Page Speed Analysis
==================================
Checks: Server response time, resource count, render-blocking resources,
compression, caching headers, total page weight estimates, critical path.
"""

import re
from urllib.parse import urlparse
from utils.crawler import CrawlResult
from utils.scoring import score_category


def analyze(page: CrawlResult) -> dict:
    """Run page speed analysis based on HTML inspection and headers."""
    if not page.soup:
        return score_category([])

    checks = []
    headers = page.headers

    # ── 1. Server response time (TTFB proxy) ─────────────
    ttfb_ok = page.load_time < 2.0
    checks.append({
        "name": "Server response time",
        "passed": ttfb_ok,
        "weight": 1.0,
        "severity": "critical" if page.load_time > 5.0 else "warning",
        "message": f"Response in {page.load_time:.2f}s",
        "recommendation": "" if ttfb_ok else (
            f"Server took {page.load_time:.2f}s to respond. Aim for <1s. "
            "Consider a faster host, caching plugin, or CDN."
        ),
    })

    # ── 2. Compression enabled ────────────────────────────
    encoding = headers.get("Content-Encoding", "")
    compressed = encoding.lower() in ("gzip", "br", "deflate")
    checks.append({
        "name": "Compression enabled (gzip/brotli)",
        "passed": compressed,
        "weight": 0.8,
        "severity": "warning",
        "message": f"Compression: {encoding}" if compressed else "No compression detected",
        "recommendation": "" if compressed else "Enable gzip or Brotli compression on your server. This can reduce page size by 60-80%.",
    })

    # ── 3. Browser caching headers ────────────────────────
    cache_control = headers.get("Cache-Control", "")
    has_caching = bool(cache_control) and "no-store" not in cache_control.lower()
    checks.append({
        "name": "Browser caching headers",
        "passed": has_caching,
        "weight": 0.6,
        "severity": "warning",
        "message": f"Cache-Control: {cache_control}" if cache_control else "No Cache-Control header",
        "recommendation": "" if has_caching else "Add Cache-Control headers to enable browser caching for static resources.",
    })

    # ── 4. Render-blocking CSS ────────────────────────────
    stylesheets = page.soup.find_all("link", rel="stylesheet")
    css_count = len(stylesheets)
    css_ok = css_count <= 5
    checks.append({
        "name": "Render-blocking CSS minimized",
        "passed": css_ok,
        "weight": 0.7,
        "severity": "warning",
        "message": f"{css_count} external stylesheets",
        "recommendation": "" if css_ok else (
            f"{css_count} external CSS files may block rendering. "
            "Inline critical CSS and defer non-essential stylesheets."
        ),
    })

    # ── 5. Render-blocking JavaScript ─────────────────────
    scripts = page.soup.find_all("script", src=True)
    blocking_scripts = [s for s in scripts if not s.get("async") and not s.get("defer")]
    script_ok = len(blocking_scripts) <= 3
    checks.append({
        "name": "JavaScript loading optimized",
        "passed": script_ok,
        "weight": 0.7,
        "severity": "warning",
        "message": f"{len(blocking_scripts)}/{len(scripts)} scripts are render-blocking",
        "recommendation": "" if script_ok else (
            f"{len(blocking_scripts)} scripts block page rendering. "
            "Add 'async' or 'defer' attributes to non-critical scripts."
        ),
    })

    # ── 6. Total external resources ───────────────────────
    all_scripts = len(page.soup.find_all("script", src=True))
    all_css = len(page.soup.find_all("link", rel="stylesheet"))
    all_imgs = len(page.soup.find_all("img"))
    total_resources = all_scripts + all_css + all_imgs
    resources_ok = total_resources <= 60
    checks.append({
        "name": "Total resource count",
        "passed": resources_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"{total_resources} resources ({all_scripts} JS, {all_css} CSS, {all_imgs} images)",
        "recommendation": "" if resources_ok else (
            f"Page loads {total_resources} resources. Reduce by combining files, "
            "removing unused scripts, and optimizing images."
        ),
    })

    # ── 7. Inline styles minimized ────────────────────────
    inline_styles = page.soup.find_all(style=True)
    inline_ok = len(inline_styles) <= 15
    checks.append({
        "name": "Minimal inline styles",
        "passed": inline_ok,
        "weight": 0.3,
        "severity": "info",
        "message": f"{len(inline_styles)} elements with inline styles",
        "recommendation": "" if inline_ok else "Move inline styles to external CSS for better caching and maintainability.",
    })

    # ── 8. Preconnect / preload hints ─────────────────────
    preconnects = page.soup.find_all("link", rel="preconnect")
    preloads = page.soup.find_all("link", rel="preload")
    has_hints = len(preconnects) > 0 or len(preloads) > 0
    checks.append({
        "name": "Resource hints (preconnect/preload)",
        "passed": has_hints,
        "weight": 0.4,
        "severity": "info",
        "message": f"{len(preconnects)} preconnects, {len(preloads)} preloads",
        "recommendation": "" if has_hints else (
            "Add <link rel='preconnect'> for critical third-party domains "
            "and <link rel='preload'> for above-the-fold resources."
        ),
    })

    # ── 9. HTML size estimate ─────────────────────────────
    html_size_kb = len(page.html.encode("utf-8")) / 1024
    html_ok = html_size_kb < 200
    checks.append({
        "name": "HTML document size",
        "passed": html_ok,
        "weight": 0.4,
        "severity": "warning" if html_size_kb > 500 else "info",
        "message": f"HTML size: {html_size_kb:.0f} KB",
        "recommendation": "" if html_ok else (
            f"HTML document is {html_size_kb:.0f} KB. "
            "Minify HTML and remove unnecessary inline code to reduce size."
        ),
    })

    return score_category(checks)
