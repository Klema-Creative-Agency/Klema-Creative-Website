"""
Module 12 — Reputation & Reviews Analysis
============================================
Checks: Review schema, testimonial content, social proof signals,
review platform links, aggregate ratings, response indicators.
"""

import re
import json
from utils.crawler import CrawlResult, extract_structured_data
from utils.scoring import score_category


def analyze(page: CrawlResult, all_pages: list = None) -> dict:
    """Run reputation and review signal analysis."""
    if not page.soup:
        return score_category([])

    all_pages = all_pages or []
    checks = []
    schemas = extract_structured_data(page.soup)
    body_text = page.soup.get_text(separator=" ", strip=True).lower()

    # Combine text from all pages for broader signals
    all_text = body_text
    for p in all_pages[:5]:
        if p.soup:
            all_text += " " + p.soup.get_text(separator=" ", strip=True).lower()

    # ── 1. Review/Rating schema ───────────────────────────
    has_rating_schema = False
    rating_value = None
    review_count = None
    for schema in schemas:
        if schema.get("@type") == "AggregateRating":
            has_rating_schema = True
            rating_value = schema.get("ratingValue")
            review_count = schema.get("reviewCount")
        elif schema.get("aggregateRating"):
            has_rating_schema = True
            ar = schema["aggregateRating"]
            rating_value = ar.get("ratingValue")
            review_count = ar.get("reviewCount")
    checks.append({
        "name": "AggregateRating schema",
        "passed": has_rating_schema,
        "weight": 1.0,
        "severity": "warning",
        "message": (
            f"Rating: {rating_value}/5 ({review_count} reviews)"
            if has_rating_schema and rating_value
            else "No aggregate rating schema found"
        ),
        "recommendation": "" if has_rating_schema else (
            "Add AggregateRating schema to show star ratings in search results. "
            "This dramatically improves click-through rates."
        ),
    })

    # ── 2. Individual Review schema ───────────────────────
    review_schemas = [s for s in schemas if s.get("@type") == "Review"]
    has_reviews_schema = len(review_schemas) > 0
    checks.append({
        "name": "Individual Review schema",
        "passed": has_reviews_schema,
        "weight": 0.6,
        "severity": "info",
        "message": f"{len(review_schemas)} Review schema(s) found" if has_reviews_schema else "No individual Review schemas",
        "recommendation": "" if has_reviews_schema else "Mark up individual reviews with Review schema for rich snippet eligibility.",
    })

    # ── 3. Testimonial content on page ────────────────────
    testimonial_keywords = [
        "testimonial", "review", "what our customers say",
        "what clients say", "customer stories", "client feedback",
        "hear from", "satisfied customers", "happy customer",
    ]
    has_testimonials = any(kw in all_text for kw in testimonial_keywords)
    checks.append({
        "name": "Testimonial/review content",
        "passed": has_testimonials,
        "weight": 0.8,
        "severity": "warning",
        "message": "Testimonial/review content found" if has_testimonials else "No testimonial content detected",
        "recommendation": "" if has_testimonials else (
            "Add a testimonials or reviews section to your site. "
            "Display real customer feedback to build trust and improve conversions."
        ),
    })

    # ── 4. Review platform links ──────────────────────────
    review_platforms = [
        "google.com/maps", "yelp.com", "facebook.com/pg",
        "bbb.org", "trustpilot.com", "angi.com",
        "homeadvisor.com", "thumbtack.com", "houzz.com",
        "healthgrades.com", "avvo.com", "zocdoc.com",
    ]
    found_platforms = []
    for a in page.soup.find_all("a", href=True):
        href = a["href"].lower()
        for platform in review_platforms:
            if platform in href:
                found_platforms.append(platform.split(".")[0])
                break
    # Also check all pages
    for p in all_pages[:5]:
        if p.soup:
            for a in p.soup.find_all("a", href=True):
                href = a["href"].lower()
                for platform in review_platforms:
                    if platform in href and platform.split(".")[0] not in found_platforms:
                        found_platforms.append(platform.split(".")[0])
                        break

    has_platform_links = len(found_platforms) > 0
    checks.append({
        "name": "Review platform links",
        "passed": has_platform_links,
        "weight": 0.6,
        "severity": "info",
        "message": f"Links to: {', '.join(set(found_platforms))}" if found_platforms else "No links to review platforms found",
        "recommendation": "" if has_platform_links else (
            "Link to your Google Business, Yelp, or industry-specific review profiles. "
            "This shows transparency and makes it easy for customers to leave reviews."
        ),
    })

    # ── 5. Social proof numbers ───────────────────────────
    social_patterns = [
        r'\d+\+?\s*reviews?', r'\d+\+?\s*customers?',
        r'\d+\+?\s*clients?', r'\d+\+?\s*projects?',
        r'rated\s+\d', r'\d+\s*star',
        r'\d+\+?\s*years?\s*(of\s+)?experience',
    ]
    proof_count = sum(1 for p in social_patterns if re.search(p, all_text))
    has_proof = proof_count >= 2
    checks.append({
        "name": "Social proof indicators",
        "passed": has_proof,
        "weight": 0.7,
        "severity": "warning",
        "message": f"{proof_count} social proof indicators found",
        "recommendation": "" if has_proof else (
            "Add specific social proof: '500+ satisfied customers', "
            "'Rated 4.9 stars', '15+ years experience'. Numbers build credibility."
        ),
    })

    # ── 6. sameAs social links in schema ──────────────────
    same_as = []
    for schema in schemas:
        sa = schema.get("sameAs", [])
        if isinstance(sa, str):
            same_as.append(sa)
        elif isinstance(sa, list):
            same_as.extend(sa)
    has_social = len(same_as) > 0
    checks.append({
        "name": "Social profile schema links",
        "passed": has_social,
        "weight": 0.4,
        "severity": "info",
        "message": f"{len(same_as)} social profiles in schema" if has_social else "No sameAs social links in schema",
        "recommendation": "" if has_social else "Add sameAs array to your Organization schema with links to all social media profiles.",
    })

    # ── 7. Trust badges / certifications ──────────────────
    trust_keywords = [
        "certified", "licensed", "insured", "accredited",
        "bbb", "member", "association", "chamber of commerce",
        "award", "recognition", "bonded",
    ]
    trust_count = sum(1 for kw in trust_keywords if kw in all_text)
    has_trust = trust_count >= 2
    checks.append({
        "name": "Trust badges / certifications",
        "passed": has_trust,
        "weight": 0.5,
        "severity": "info",
        "message": f"{trust_count} trust/certification signals found",
        "recommendation": "" if has_trust else (
            "Display industry certifications, licenses, BBB membership, "
            "and professional association badges prominently on your site."
        ),
    })

    return score_category(checks)
