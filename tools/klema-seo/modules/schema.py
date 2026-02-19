"""
Module 4 — Schema Markup Analysis
====================================
Checks: JSON-LD presence, schema types, required properties,
validation of common schema types (LocalBusiness, FAQ, Breadcrumb,
Product, Review, Organization, WebSite, etc.)
"""

import json
from utils.crawler import CrawlResult, extract_structured_data
from utils.scoring import score_category


# Required fields per schema type
REQUIRED_FIELDS = {
    "LocalBusiness": ["name", "address", "telephone"],
    "Organization": ["name", "url"],
    "WebSite": ["url", "name"],
    "WebPage": ["name", "url"],
    "BreadcrumbList": ["itemListElement"],
    "FAQPage": ["mainEntity"],
    "Product": ["name", "offers"],
    "Service": ["name", "provider"],
    "Review": ["reviewRating", "author"],
    "AggregateRating": ["ratingValue", "reviewCount"],
    "Article": ["headline", "author", "datePublished"],
    "Event": ["name", "startDate", "location"],
    "VideoObject": ["name", "uploadDate", "thumbnailUrl"],
}

# Recommended fields for LocalBusiness
LOCAL_BIZ_RECOMMENDED = [
    "name", "address", "telephone", "openingHoursSpecification",
    "geo", "image", "url", "priceRange", "aggregateRating",
    "areaServed", "description", "sameAs",
]


def analyze(page: CrawlResult) -> dict:
    """Run schema markup analysis."""
    if not page.soup:
        return score_category([])

    checks = []
    schemas = extract_structured_data(page.soup)

    # ── 1. Has any structured data ────────────────────────
    has_schema = len(schemas) > 0
    checks.append({
        "name": "Structured data present",
        "passed": has_schema,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Found {len(schemas)} schema object(s)" if has_schema else "No JSON-LD structured data found",
        "recommendation": "" if has_schema else "Add JSON-LD structured data to help search engines understand your content.",
    })

    if not has_schema:
        # Add recommendations for what to add
        checks.append({
            "name": "LocalBusiness schema",
            "passed": False,
            "weight": 0.9,
            "severity": "critical",
            "message": "Missing — essential for local businesses",
            "recommendation": "Add LocalBusiness schema with name, address, phone, hours, and coordinates.",
        })
        checks.append({
            "name": "WebSite schema with SearchAction",
            "passed": False,
            "weight": 0.5,
            "severity": "warning",
            "message": "Missing — helps with sitelinks search box",
            "recommendation": "Add WebSite schema with potentialAction SearchAction for sitelinks search.",
        })
        return score_category(checks)

    # ── 2. Identify and validate each schema ──────────────
    found_types = set()
    for schema in schemas:
        schema_type = schema.get("@type", "Unknown")
        if isinstance(schema_type, list):
            for t in schema_type:
                found_types.add(t)
                _validate_schema(checks, schema, t)
        else:
            found_types.add(schema_type)
            _validate_schema(checks, schema, schema_type)

    # ── 3. Uses JSON-LD format (not microdata) ────────────
    # We only extract JSON-LD, so if we found some, it's already JSON-LD
    checks.append({
        "name": "Uses JSON-LD format",
        "passed": True,
        "weight": 0.5,
        "severity": "info",
        "message": "Structured data is in JSON-LD format (recommended by Google)",
        "recommendation": "",
    })

    # ── 4. Has Organization or LocalBusiness ──────────────
    has_org = bool(found_types & {"Organization", "LocalBusiness"} |
                   {t for t in found_types if "Business" in t or t in REQUIRED_FIELDS})
    checks.append({
        "name": "Organization/Business identity",
        "passed": has_org,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Business types found: {', '.join(found_types)}" if has_org else "No Organization or Business schema",
        "recommendation": "" if has_org else "Add Organization or LocalBusiness schema to establish your business identity.",
    })

    # ── 5. Has Breadcrumb schema ──────────────────────────
    has_breadcrumb = "BreadcrumbList" in found_types
    checks.append({
        "name": "Breadcrumb schema",
        "passed": has_breadcrumb,
        "weight": 0.4,
        "severity": "info",
        "message": "BreadcrumbList schema found" if has_breadcrumb else "No breadcrumb schema",
        "recommendation": "" if has_breadcrumb else "Add BreadcrumbList schema for better SERP appearance and site navigation.",
    })

    # ── 6. FAQ schema opportunity ─────────────────────────
    has_faq = "FAQPage" in found_types
    body_text = page.soup.get_text(separator=" ", strip=True).lower()
    has_faq_content = any(kw in body_text for kw in ["faq", "frequently asked", "common questions", "q&a"])
    checks.append({
        "name": "FAQ schema",
        "passed": has_faq,
        "weight": 0.5,
        "severity": "info" if not has_faq_content else "warning",
        "message": "FAQPage schema found" if has_faq else (
            "FAQ content detected but no FAQ schema" if has_faq_content else "No FAQ schema (consider adding)"
        ),
        "recommendation": "" if has_faq else "Add FAQPage schema to your FAQ content for rich snippet eligibility.",
    })

    # ── 7. sameAs links (social profiles) ─────────────────
    same_as_found = False
    for schema in schemas:
        if schema.get("sameAs"):
            same_as_found = True
            break
    checks.append({
        "name": "Social profile links (sameAs)",
        "passed": same_as_found,
        "weight": 0.3,
        "severity": "info",
        "message": "sameAs social links found" if same_as_found else "No sameAs social profile links in schema",
        "recommendation": "" if same_as_found else "Add sameAs array with links to your social media profiles in your Organization schema.",
    })

    return score_category(checks)


def _validate_schema(checks: list, schema: dict, schema_type: str):
    """Validate required fields for a specific schema type."""
    required = REQUIRED_FIELDS.get(schema_type, [])
    if not required:
        return

    missing = [f for f in required if not schema.get(f)]
    complete = len(missing) == 0

    if schema_type in ("LocalBusiness",) or "Business" in schema_type:
        # Extra validation for local business
        recommended_missing = [f for f in LOCAL_BIZ_RECOMMENDED if not schema.get(f)]
        completeness = ((len(LOCAL_BIZ_RECOMMENDED) - len(recommended_missing))
                        / len(LOCAL_BIZ_RECOMMENDED) * 100)

        checks.append({
            "name": f"{schema_type} schema completeness",
            "passed": completeness >= 70,
            "weight": 0.8,
            "severity": "warning" if completeness < 70 else "info",
            "message": f"{schema_type} is {completeness:.0f}% complete ({len(recommended_missing)} recommended fields missing)",
            "recommendation": (
                f"Add these fields to your {schema_type} schema: {', '.join(recommended_missing[:5])}"
                if recommended_missing else ""
            ),
        })
    elif missing:
        checks.append({
            "name": f"{schema_type} required fields",
            "passed": complete,
            "weight": 0.6,
            "severity": "warning",
            "message": f"{schema_type} missing: {', '.join(missing)}" if missing else f"{schema_type} has all required fields",
            "recommendation": f"Add missing fields to {schema_type}: {', '.join(missing)}" if missing else "",
        })
