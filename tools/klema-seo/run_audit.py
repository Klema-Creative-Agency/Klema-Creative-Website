#!/usr/bin/env python3
"""
Klema SEO Audit Service
========================
Run a comprehensive SEO audit on any website and generate
a branded HTML dashboard report.

Usage:
    python run_audit.py https://example.com
    python run_audit.py https://example.com --client "Joe's Plumbing"
    python run_audit.py https://example.com --json
    python run_audit.py https://example.com --competitors https://rival1.com https://rival2.com
    python run_audit.py https://example.com --pages 20 --output my_report.html
"""

import sys
import os
import argparse
import time
import json as json_lib

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import config
from utils.crawler import Crawler
from utils.scoring import overall_score
from utils.reporter import generate_dashboard, save_dashboard

from modules import technical
from modules import onpage
from modules import local_seo
from modules import schema
from modules import content
from modules import images
from modules import sitemap
from modules import geo
from modules import competitor
from modules import pagespeed
from modules import mobile
from modules import reputation


def log(msg, json_mode=False):
    """Print to stderr when in JSON mode, stdout otherwise."""
    if json_mode:
        print(msg, file=sys.stderr)
    else:
        print(msg)


def run_audit(url: str, client_name: str = "", competitor_urls: list = None,
              max_pages: int = None, output_file: str = "",
              json_mode: bool = False):
    """
    Run a full SEO audit.

    When json_mode=True, returns the full audit dict (and prints JSON to stdout).
    Otherwise returns the path to the generated HTML report.
    """
    competitor_urls = competitor_urls or []
    max_pages = max_pages or config.MAX_PAGES_TO_CRAWL

    log(f"\n{'='*60}", json_mode)
    log(f"  {config.AGENCY_NAME} — SEO Audit Service", json_mode)
    log(f"{'='*60}", json_mode)
    log(f"  Target:  {url}", json_mode)
    if client_name:
        log(f"  Client:  {client_name}", json_mode)
    if competitor_urls:
        log(f"  Competitors: {', '.join(competitor_urls)}", json_mode)
    log(f"  Max pages: {max_pages}", json_mode)
    log(f"{'='*60}\n", json_mode)

    crawler = Crawler()

    # ── Phase 1: Crawl the site ───────────────────────────
    log("[1/4] Crawling site...", json_mode)
    start_time = time.time()
    all_pages = crawler.crawl_site(url, max_pages=max_pages)
    crawl_time = time.time() - start_time
    log(f"      Crawled {len(all_pages)} pages in {crawl_time:.1f}s", json_mode)

    if not all_pages or not all_pages[0].ok:
        error_msg = "Could not access site"
        if all_pages:
            error_msg = f"Status {all_pages[0].status_code}: {all_pages[0].error}"
        log(f"\n  ERROR: Could not access {url}", json_mode)
        if json_mode:
            json_lib.dump({"error": error_msg, "url": url}, sys.stdout)
            sys.exit(1)
        else:
            sys.exit(1)

    homepage = all_pages[0]

    # ── Phase 2: Fetch supporting data ────────────────────
    log("[2/4] Fetching robots.txt and sitemap...", json_mode)
    robots_txt = crawler.fetch_robots_txt(url)
    sitemap_xml = crawler.fetch_sitemap(url)
    log(f"      robots.txt: {'found' if robots_txt else 'not found'}", json_mode)
    log(f"      sitemap.xml: {'found' if sitemap_xml else 'not found'}", json_mode)

    # ── Phase 3: Run all 12 analysis modules ──────────────
    log("[3/4] Running analysis modules...", json_mode)
    category_results = {}

    modules_to_run = [
        ("technical",  lambda: technical.analyze(homepage, robots_txt, all_pages)),
        ("onpage",     lambda: onpage.analyze(homepage)),
        ("local_seo",  lambda: local_seo.analyze(homepage, all_pages)),
        ("schema",     lambda: schema.analyze(homepage)),
        ("content",    lambda: content.analyze(homepage, all_pages)),
        ("images",     lambda: images.analyze(homepage)),
        ("sitemap",    lambda: sitemap.analyze(homepage, sitemap_xml, all_pages, robots_txt)),
        ("geo",        lambda: geo.analyze(homepage)),
        ("competitor", lambda: competitor.analyze(homepage, competitor_urls)),
        ("pagespeed",  lambda: pagespeed.analyze(homepage)),
        ("mobile",     lambda: mobile.analyze(homepage)),
        ("reputation", lambda: reputation.analyze(homepage, all_pages)),
    ]

    for name, run_fn in modules_to_run:
        try:
            result = run_fn()
            category_results[name] = result
            status = "PASS" if result["score"] >= 70 else ("WARN" if result["score"] >= 50 else "FAIL")
            log(f"      [{status}] {name:15s} → {result['score']}/100 ({result['grade']})", json_mode)
        except Exception as e:
            log(f"      [ERR ] {name:15s} → {e}", json_mode)
            category_results[name] = {
                "score": 0, "grade": "ERR", "passed": 0,
                "failed": 0, "critical_issues": 0, "checks": [],
            }

    # ── Phase 4: Compute scores & output ──────────────────
    audit = overall_score(category_results)
    total_time = time.time() - start_time

    log(f"\n{'='*60}", json_mode)
    log(f"  AUDIT COMPLETE", json_mode)
    log(f"  Overall Score: {audit['score']}/100 ({audit['grade']})", json_mode)
    log(f"  Checks: {audit['total_passed']} passed, {audit['total_failed']} failed, {audit['total_critical']} critical", json_mode)
    log(f"  Time: {total_time:.1f}s", json_mode)

    if json_mode:
        # Build full JSON output
        # Extract recommendations from failed checks
        recommendations = []
        for cat_key, cat_result in category_results.items():
            for check in cat_result.get("checks", []):
                if not check.get("passed"):
                    recommendations.append({
                        "category": cat_key,
                        "severity": check.get("severity", "info"),
                        "title": check.get("name", ""),
                        "description": check.get("message", ""),
                        "recommendation": check.get("recommendation", ""),
                        "page_url": check.get("page_url", ""),
                    })

        # Sort recommendations: critical first, then warning, then info
        sev_order = {"critical": 0, "warning": 1, "info": 2}
        recommendations.sort(key=lambda r: sev_order.get(r["severity"], 3))

        output = {
            "url": url,
            "client_name": client_name,
            "overall_score": audit["score"],
            "overall_grade": audit["grade"],
            "total_checks": audit["total_checks"],
            "total_passed": audit["total_passed"],
            "total_failed": audit["total_failed"],
            "total_critical": audit["total_critical"],
            "pages_crawled": len(all_pages),
            "crawl_duration_ms": int(crawl_time * 1000),
            "audit_duration_ms": int(total_time * 1000),
            "category_results": category_results,
            "recommendations": recommendations,
        }
        json_lib.dump(output, sys.stdout, indent=2, default=str)
        log(f"  JSON output written to stdout", json_mode)
        log(f"{'='*60}\n", json_mode)
        return output
    else:
        log("[4/4] Generating dashboard report...", json_mode)
        html = generate_dashboard(audit, url, client_name)
        filepath = save_dashboard(html, output_file)
        log(f"  Report saved to: {os.path.abspath(filepath)}", json_mode)
        log(f"{'='*60}\n", json_mode)
        return filepath


def main():
    parser = argparse.ArgumentParser(
        description=f"{config.AGENCY_NAME} — SEO Audit Service",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_audit.py https://joesplumbing.com
  python run_audit.py https://joesplumbing.com --client "Joe's Plumbing"
  python run_audit.py https://joesplumbing.com --json
  python run_audit.py https://joesplumbing.com --competitors https://rival1.com https://rival2.com
  python run_audit.py https://joesplumbing.com --pages 30 --output joes_audit.html
        """,
    )
    parser.add_argument("url", help="Target website URL to audit")
    parser.add_argument("--client", "-c", default="", help="Client business name")
    parser.add_argument("--json", "-j", action="store_true", help="Output results as JSON to stdout (logs go to stderr)")
    parser.add_argument("--competitors", "-C", nargs="*", default=[], help="Competitor URLs")
    parser.add_argument("--pages", "-p", type=int, default=None, help="Max pages to crawl")
    parser.add_argument("--output", "-o", default="", help="Output filename")

    args = parser.parse_args()

    # Ensure URL has scheme
    url = args.url
    if not url.startswith("http"):
        url = "https://" + url

    run_audit(url, args.client, args.competitors, args.pages, args.output,
              json_mode=args.json)


if __name__ == "__main__":
    main()
