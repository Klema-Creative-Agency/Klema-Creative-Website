"""
Module 5 — Content Quality & E-E-A-T Analysis
================================================
Checks: Content depth, readability signals, E-E-A-T indicators,
duplicate content risk, thin content, keyword stuffing,
author attribution, freshness signals.
"""

import re
from collections import Counter
from utils.crawler import CrawlResult, extract_meta, extract_headings, word_count
from utils.scoring import score_category


def analyze(page: CrawlResult, all_pages: list = None) -> dict:
    """Run content quality and E-E-A-T analysis."""
    if not page.soup:
        return score_category([])

    all_pages = all_pages or []
    checks = []
    meta = extract_meta(page.soup)

    # Clone soup for text analysis (remove nav/footer/script)
    from bs4 import BeautifulSoup
    text_soup = BeautifulSoup(str(page.soup), "lxml")
    for tag in text_soup(["script", "style", "nav", "header", "footer", "aside"]):
        tag.decompose()
    body_text = text_soup.get_text(separator=" ", strip=True)
    words = body_text.split()
    wc = len(words)

    # ── 1. Content depth ──────────────────────────────────
    depth_ok = wc >= 500
    checks.append({
        "name": "Content depth (500+ words)",
        "passed": depth_ok,
        "weight": 0.8,
        "severity": "warning",
        "message": f"~{wc} words of content",
        "recommendation": "" if depth_ok else (
            f"Page has only ~{wc} words. For competitive local keywords, "
            "aim for 500-1500 words of helpful, original content."
        ),
    })

    # ── 2. Thin content detection ─────────────────────────
    not_thin = wc >= 200
    checks.append({
        "name": "Not thin content",
        "passed": not_thin,
        "weight": 0.9,
        "severity": "critical",
        "message": f"~{wc} words" if not_thin else f"Thin content detected: only ~{wc} words",
        "recommendation": "" if not_thin else "This page has very little content. Add substantial, helpful information for visitors.",
    })

    # ── 3. Keyword stuffing check ─────────────────────────
    if wc > 50:
        word_freq = Counter(w.lower() for w in words if len(w) > 3)
        most_common = word_freq.most_common(1)
        if most_common:
            top_word, top_count = most_common[0]
            density = (top_count / wc) * 100
            not_stuffed = density < 4.0
        else:
            not_stuffed = True
            density = 0
    else:
        not_stuffed = True
        density = 0

    checks.append({
        "name": "No keyword stuffing",
        "passed": not_stuffed,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Top keyword density: {density:.1f}%",
        "recommendation": "" if not_stuffed else (
            f"Keyword density is high ({density:.1f}%). "
            "Write naturally — Google penalizes over-optimization."
        ),
    })

    # ── 4. Paragraph structure ────────────────────────────
    paragraphs = page.soup.find_all("p")
    meaningful_p = [p for p in paragraphs if len(p.get_text(strip=True)) > 40]
    good_structure = len(meaningful_p) >= 3
    checks.append({
        "name": "Well-structured paragraphs",
        "passed": good_structure,
        "weight": 0.5,
        "severity": "info",
        "message": f"{len(meaningful_p)} substantial paragraphs",
        "recommendation": "" if good_structure else "Break content into clear paragraphs with distinct topics for better readability.",
    })

    # ── 5. Lists or formatting ────────────────────────────
    lists = page.soup.find_all(["ul", "ol"])
    has_lists = len(lists) > 0
    checks.append({
        "name": "Content formatting (lists/bullets)",
        "passed": has_lists,
        "weight": 0.3,
        "severity": "info",
        "message": f"{len(lists)} lists found" if has_lists else "No lists found in content",
        "recommendation": "" if has_lists else "Use bullet points or numbered lists to make content scannable.",
    })

    # ── 6. E-E-A-T: Author attribution ───────────────────
    body_lower = body_text.lower()
    author_signals = ["written by", "author:", "by ", "posted by", "reviewed by"]
    # Also check for author schema
    schemas = []
    for script in page.soup.find_all("script", type="application/ld+json"):
        try:
            import json
            data = json.loads(script.string)
            if isinstance(data, list):
                schemas.extend(data)
            else:
                schemas.append(data)
        except Exception:
            pass

    has_author = (
        any(sig in body_lower for sig in author_signals) or
        any(s.get("author") for s in schemas)
    )
    checks.append({
        "name": "E-E-A-T: Author attribution",
        "passed": has_author,
        "weight": 0.5,
        "severity": "info",
        "message": "Author attribution found" if has_author else "No author attribution detected",
        "recommendation": "" if has_author else "Add author names to content. Google's E-E-A-T guidelines value clear authorship.",
    })

    # ── 7. E-E-A-T: About page ───────────────────────────
    has_about = False
    for p in all_pages:
        if "about" in p.url.lower():
            has_about = True
            break
    if not has_about and page.soup:
        for a in page.soup.find_all("a", href=True):
            if "about" in a["href"].lower():
                has_about = True
                break
    checks.append({
        "name": "E-E-A-T: About page exists",
        "passed": has_about,
        "weight": 0.6,
        "severity": "warning",
        "message": "About page found" if has_about else "No About page detected",
        "recommendation": "" if has_about else (
            "Create an About page showcasing your expertise, experience, "
            "and credentials. This is a key E-E-A-T signal."
        ),
    })

    # ── 8. E-E-A-T: Trust signals ────────────────────────
    trust_keywords = [
        "certified", "licensed", "insured", "years of experience",
        "award", "accredited", "bbb", "member of",
        "guarantee", "warranty", "trusted",
    ]
    trust_count = sum(1 for kw in trust_keywords if kw in body_lower)
    has_trust = trust_count >= 2
    checks.append({
        "name": "E-E-A-T: Trust signals",
        "passed": has_trust,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{trust_count} trust signals found",
        "recommendation": "" if has_trust else (
            "Add trust indicators: certifications, licenses, years in business, "
            "industry memberships, guarantees, awards."
        ),
    })

    # ── 9. Freshness: Date signals ────────────────────────
    date_patterns = [
        r'\b\d{4}\b',  # Year
        r'updated', r'modified', r'published',
    ]
    has_date = any(
        re.search(pat, body_lower) for pat in date_patterns
    ) or any(s.get("dateModified") or s.get("datePublished") for s in schemas)
    checks.append({
        "name": "Content freshness signals",
        "passed": has_date,
        "weight": 0.4,
        "severity": "info",
        "message": "Freshness/date signals found" if has_date else "No freshness indicators",
        "recommendation": "" if has_date else "Add 'last updated' dates to show content freshness. Keep content current.",
    })

    # ── 10. Unique value proposition ──────────────────────
    cta_keywords = ["call", "book", "schedule", "get a quote", "free estimate",
                    "contact us", "get started", "request", "sign up"]
    cta_count = sum(1 for kw in cta_keywords if kw in body_lower)
    has_cta = cta_count >= 1
    checks.append({
        "name": "Clear call-to-action",
        "passed": has_cta,
        "weight": 0.5,
        "severity": "warning",
        "message": f"{cta_count} CTA(s) detected" if has_cta else "No clear call-to-action found",
        "recommendation": "" if has_cta else (
            "Add clear calls-to-action: 'Call Now', 'Get a Free Quote', "
            "'Book an Appointment'. Guide visitors to convert."
        ),
    })

    return score_category(checks)
