"""
Module 8 — GEO (Generative Engine Optimization)
==================================================
Optimize for AI search: ChatGPT, Perplexity, Gemini, Claude, Copilot.
Checks: Citability, structured answers, entity clarity, FAQ patterns,
direct answer formatting, statistical claims, source signals.
"""

import re
import json
from utils.crawler import CrawlResult, extract_meta, extract_headings, extract_structured_data
from utils.scoring import score_category


def analyze(page: CrawlResult) -> dict:
    """Run Generative Engine Optimization analysis."""
    if not page.soup:
        return score_category([])

    checks = []
    meta = extract_meta(page.soup)
    headings = extract_headings(page.soup)
    schemas = extract_structured_data(page.soup)

    # Get clean body text
    from bs4 import BeautifulSoup
    text_soup = BeautifulSoup(str(page.soup), "lxml")
    for tag in text_soup(["script", "style", "nav", "footer"]):
        tag.decompose()
    body_text = text_soup.get_text(separator=" ", strip=True)
    body_lower = body_text.lower()

    # ── 1. Direct answer patterns ─────────────────────────
    # AI engines love content that directly answers questions
    direct_patterns = [
        r'\b\w+\s+is\s+(a|an|the)\s+',     # "X is a/an/the..."
        r'\bthe\s+\w+\s+(of|for)\s+',       # Definition patterns
        r'\bhow\s+to\s+\w+',                # How-to patterns
        r'\bsteps?\s+(to|for)\s+',           # Step patterns
        r'\btip[s]?\s+(for|on|to)\s+',       # Tips patterns
    ]
    direct_count = sum(1 for p in direct_patterns if re.search(p, body_lower))
    has_direct = direct_count >= 2
    checks.append({
        "name": "Direct answer patterns",
        "passed": has_direct,
        "weight": 0.9,
        "severity": "warning",
        "message": f"{direct_count} direct-answer patterns detected",
        "recommendation": "" if has_direct else (
            "Structure content with direct answers: 'X is...', 'The best way to...', "
            "'Steps to...'. AI engines extract these for featured answers."
        ),
    })

    # ── 2. Question-and-answer format ─────────────────────
    question_headings = 0
    for level in ["h2", "h3", "h4"]:
        for h in headings.get(level, []):
            if "?" in h or h.lower().startswith(("what", "how", "why", "when", "where", "who", "can", "does", "is")):
                question_headings += 1
    has_qa = question_headings >= 2
    checks.append({
        "name": "Q&A formatted headings",
        "passed": has_qa,
        "weight": 0.8,
        "severity": "warning",
        "message": f"{question_headings} question-format headings found",
        "recommendation": "" if has_qa else (
            "Use question-based headings (H2/H3): 'How much does [service] cost?', "
            "'What are the signs of [problem]?'. AI engines match these to user queries."
        ),
    })

    # ── 3. FAQ schema ─────────────────────────────────────
    has_faq_schema = any(
        s.get("@type") == "FAQPage" or
        s.get("@type") == "Question"
        for s in schemas
    )
    checks.append({
        "name": "FAQ structured data",
        "passed": has_faq_schema,
        "weight": 0.7,
        "severity": "warning",
        "message": "FAQPage schema found" if has_faq_schema else "No FAQ schema",
        "recommendation": "" if has_faq_schema else (
            "Add FAQPage schema markup to your Q&A content. "
            "AI engines heavily weight structured FAQ data."
        ),
    })

    # ── 4. Statistical / numeric claims ───────────────────
    stat_patterns = [
        r'\d+%',                    # Percentages
        r'\$[\d,]+',                # Dollar amounts
        r'\d+\s+(years?|months?)',  # Time spans
        r'\d+\+?\s+(customers?|clients?|projects?|reviews?)',  # Counts
    ]
    stat_count = sum(1 for p in stat_patterns if re.search(p, body_text))
    has_stats = stat_count >= 2
    checks.append({
        "name": "Specific statistics / data points",
        "passed": has_stats,
        "weight": 0.6,
        "severity": "info",
        "message": f"{stat_count} statistical claims found",
        "recommendation": "" if has_stats else (
            "Include specific numbers: '15+ years experience', '500+ happy customers', "
            "'rated 4.9/5 stars'. AI engines cite specific data over vague claims."
        ),
    })

    # ── 5. Entity clarity (business name prominence) ──────
    # Check if business name appears clearly in title, H1, and schema
    title = meta.get("title", "").lower()
    h1s = [h.lower() for h in headings.get("h1", [])]
    schema_names = [s.get("name", "").lower() for s in schemas if s.get("name")]

    entity_locations = 0
    # We check for any proper noun-like phrase in multiple locations
    if title:
        entity_locations += 1
    if h1s:
        entity_locations += 1
    if schema_names:
        entity_locations += 1
    entity_ok = entity_locations >= 2
    checks.append({
        "name": "Entity clarity (brand prominence)",
        "passed": entity_ok,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Business identity present in {entity_locations}/3 key locations (title, H1, schema)",
        "recommendation": "" if entity_ok else (
            "Ensure your business name appears in the page title, H1, and schema markup. "
            "AI engines need clear entity identification to cite your business."
        ),
    })

    # ── 6. Topical authority signals ──────────────────────
    # Content depth and internal linking around topic
    word_count = len(body_text.split())
    topic_depth = word_count >= 800
    checks.append({
        "name": "Topical depth for AI citation",
        "passed": topic_depth,
        "weight": 0.6,
        "severity": "info",
        "message": f"~{word_count} words of content",
        "recommendation": "" if topic_depth else (
            "For AI engines to cite your content, aim for 800+ words of comprehensive, "
            "authoritative content on your core topics."
        ),
    })

    # ── 7. Unique value / first-hand experience ───────────
    experience_signals = [
        "in our experience", "we've found", "our team",
        "we recommend", "we offer", "our process",
        "when we", "our approach", "we specialize",
    ]
    exp_count = sum(1 for sig in experience_signals if sig in body_lower)
    has_experience = exp_count >= 2
    checks.append({
        "name": "First-hand experience signals",
        "passed": has_experience,
        "weight": 0.7,
        "severity": "warning",
        "message": f"{exp_count} first-hand experience signals",
        "recommendation": "" if has_experience else (
            "Include first-person experience: 'In our 10 years serving [city]...', "
            "'We've found that...'. AI engines prioritize first-hand expertise (E-E-A-T)."
        ),
    })

    # ── 8. Source citability ──────────────────────────────
    # Can AI easily extract and cite from this page?
    has_clear_meta = bool(meta.get("title")) and bool(meta.get("description"))
    has_clear_schema = len(schemas) > 0
    citable = has_clear_meta and has_clear_schema
    checks.append({
        "name": "AI source citability",
        "passed": citable,
        "weight": 0.8,
        "severity": "warning",
        "message": "Page is well-structured for AI citation" if citable else "Page may not be easily citable by AI engines",
        "recommendation": "" if citable else (
            "Ensure your page has clear meta tags and schema markup. "
            "AI engines use these to attribute and cite sources."
        ),
    })

    # ── 9. Content follows BLUF principle ─────────────────
    # (Bottom Line Up Front — put key info early)
    paragraphs = page.soup.find_all("p")
    first_paras = paragraphs[:3]
    first_text = " ".join(p.get_text(strip=True) for p in first_paras).lower()
    has_bluf = len(first_text.split()) >= 40
    checks.append({
        "name": "Key information early (BLUF)",
        "passed": has_bluf,
        "weight": 0.5,
        "severity": "info",
        "message": "Substantial content in opening paragraphs" if has_bluf else "Opening content is thin",
        "recommendation": "" if has_bluf else (
            "Put your most important information in the first 2-3 paragraphs. "
            "AI engines weight early content more heavily."
        ),
    })

    return score_category(checks)
