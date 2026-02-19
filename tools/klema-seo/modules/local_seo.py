"""
Module 3 — Local SEO Analysis  ★ PRIMARY MODULE ★
====================================================
Checks: NAP consistency, LocalBusiness schema, Google Business signals,
local keywords, service area pages, review signals, citation readiness,
map embeds, local link signals.
"""

import re
import json
from urllib.parse import urlparse
from utils.crawler import CrawlResult, extract_structured_data
from utils.scoring import score_category


# Common phone patterns
PHONE_RE = re.compile(
    r'(\+?1?\s*[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})'
)

# US address patterns (simplified)
ADDRESS_RE = re.compile(
    r'\d{1,5}\s+[\w\s]{2,40}(?:St|Street|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Rd|Road|Ln|Lane|Way|Ct|Court|Pl|Place|Cir|Circle)\b',
    re.IGNORECASE
)

# Common local keywords
LOCAL_KEYWORDS = [
    "near me", "in [city]", "local", "directions", "hours",
    "open now", "call us", "visit us", "our location",
    "service area", "we serve", "serving",
]


def analyze(page: CrawlResult, all_pages: list = None) -> dict:
    """Run local SEO checks — the most important module for local businesses."""
    if not page.soup:
        return score_category([])

    all_pages = all_pages or []
    checks = []
    body_text = page.soup.get_text(separator=" ", strip=True).lower()
    schemas = extract_structured_data(page.soup)

    # ── 1. LocalBusiness schema ───────────────────────────
    local_schemas = _find_local_schemas(schemas)
    has_local_schema = len(local_schemas) > 0
    checks.append({
        "name": "LocalBusiness schema markup",
        "passed": has_local_schema,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Found {len(local_schemas)} LocalBusiness schema(s)" if has_local_schema else "No LocalBusiness schema detected",
        "recommendation": "" if has_local_schema else (
            "Add LocalBusiness (or a specific subtype like Restaurant, Dentist, etc.) "
            "structured data with name, address, phone, hours, and geo coordinates."
        ),
    })

    # ── 2. NAP on page ────────────────────────────────────
    phones = PHONE_RE.findall(page.soup.get_text())
    addresses = ADDRESS_RE.findall(page.soup.get_text())
    has_nap = len(phones) > 0 and len(addresses) > 0
    checks.append({
        "name": "NAP (Name, Address, Phone) visible",
        "passed": has_nap,
        "weight": 1.0,
        "severity": "critical",
        "message": f"Found {len(phones)} phone(s), {len(addresses)} address(es)" if has_nap else "NAP information incomplete or missing",
        "recommendation": "" if has_nap else (
            "Display your full business name, address, and phone number (NAP) "
            "on every page, ideally in the footer or header. Keep it consistent across all pages."
        ),
    })

    # ── 3. NAP consistency across pages ───────────────────
    if all_pages and has_nap:
        primary_phone = phones[0].strip() if phones else ""
        consistent = True
        for p in all_pages[:10]:
            if p.soup:
                page_phones = PHONE_RE.findall(p.soup.get_text())
                if page_phones and primary_phone:
                    if primary_phone not in [ph.strip() for ph in page_phones]:
                        consistent = False
                        break
        checks.append({
            "name": "NAP consistency across pages",
            "passed": consistent,
            "weight": 0.9,
            "severity": "critical",
            "message": "NAP appears consistent" if consistent else "Inconsistent phone numbers detected across pages",
            "recommendation": "" if consistent else "Ensure your NAP is identical on every page. Inconsistencies confuse search engines.",
        })

    # ── 4. Google Maps embed ──────────────────────────────
    has_map = False
    if page.soup:
        iframes = page.soup.find_all("iframe")
        for iframe in iframes:
            src = (iframe.get("src") or "").lower()
            if "google.com/maps" in src or "maps.google" in src:
                has_map = True
                break
    checks.append({
        "name": "Google Maps embed",
        "passed": has_map,
        "weight": 0.6,
        "severity": "warning",
        "message": "Google Maps embed found" if has_map else "No Google Maps embed detected",
        "recommendation": "" if has_map else "Embed a Google Map showing your business location on your contact or homepage.",
    })

    # ── 5. Business hours schema ──────────────────────────
    has_hours = False
    for schema in local_schemas:
        if schema.get("openingHoursSpecification") or schema.get("openingHours"):
            has_hours = True
            break
    checks.append({
        "name": "Business hours in schema",
        "passed": has_hours,
        "weight": 0.7,
        "severity": "warning",
        "message": "Opening hours found in schema" if has_hours else "No business hours in structured data",
        "recommendation": "" if has_hours else "Add openingHoursSpecification to your LocalBusiness schema so Google can show your hours.",
    })

    # ── 6. Geo coordinates in schema ──────────────────────
    has_geo = False
    for schema in local_schemas:
        geo = schema.get("geo") or {}
        if geo.get("latitude") or geo.get("@type") == "GeoCoordinates":
            has_geo = True
            break
    checks.append({
        "name": "Geo coordinates in schema",
        "passed": has_geo,
        "weight": 0.5,
        "severity": "warning",
        "message": "Geo coordinates found" if has_geo else "No latitude/longitude in schema",
        "recommendation": "" if has_geo else "Add geo coordinates (latitude/longitude) to your LocalBusiness schema for precise map placement.",
    })

    # ── 7. Service area pages ─────────────────────────────
    service_pages = []
    for p in all_pages:
        path = urlparse(p.url).path.lower()
        if any(kw in path for kw in ["service", "area", "location", "city", "neighborhood"]):
            service_pages.append(p.url)
    has_service_pages = len(service_pages) > 0
    checks.append({
        "name": "Service area / location pages",
        "passed": has_service_pages,
        "weight": 0.7,
        "severity": "warning",
        "message": f"Found {len(service_pages)} location/service-area pages" if has_service_pages else "No dedicated service area pages detected",
        "recommendation": "" if has_service_pages else (
            "Create dedicated pages for each city/neighborhood you serve "
            "(e.g., /plumber-austin-tx). This is critical for local pack rankings."
        ),
    })

    # ── 8. Click-to-call link ─────────────────────────────
    has_tel = False
    if page.soup:
        for a in page.soup.find_all("a", href=True):
            if a["href"].startswith("tel:"):
                has_tel = True
                break
    checks.append({
        "name": "Click-to-call link (tel:)",
        "passed": has_tel,
        "weight": 0.6,
        "severity": "warning",
        "message": "Click-to-call link found" if has_tel else "No tel: link detected",
        "recommendation": "" if has_tel else "Add a clickable phone link: <a href='tel:+1XXXYYYZZZZ'>Call Us</a> for mobile users.",
    })

    # ── 9. Review / testimonial signals ───────────────────
    review_keywords = ["review", "testimonial", "rating", "stars", "customer said", "what our clients say"]
    has_reviews = any(kw in body_text for kw in review_keywords)
    checks.append({
        "name": "Review/testimonial content",
        "passed": has_reviews,
        "weight": 0.6,
        "severity": "warning",
        "message": "Review/testimonial content detected" if has_reviews else "No review or testimonial content found",
        "recommendation": "" if has_reviews else "Add a reviews/testimonials section. Display Google reviews or client testimonials to build trust.",
    })

    # ── 10. Review schema ─────────────────────────────────
    has_review_schema = False
    for schema in schemas:
        if schema.get("@type") in ("Review", "AggregateRating") or schema.get("aggregateRating"):
            has_review_schema = True
            break
    checks.append({
        "name": "Review/rating schema",
        "passed": has_review_schema,
        "weight": 0.5,
        "severity": "info",
        "message": "Review schema found" if has_review_schema else "No review/rating schema detected",
        "recommendation": "" if has_review_schema else "Add AggregateRating schema to display star ratings in search results.",
    })

    # ── 11. Local keyword signals ─────────────────────────
    local_signal_count = sum(1 for kw in LOCAL_KEYWORDS if kw in body_text)
    has_local_signals = local_signal_count >= 2
    checks.append({
        "name": "Local keyword signals",
        "passed": has_local_signals,
        "weight": 0.5,
        "severity": "info",
        "message": f"{local_signal_count} local keyword signals found",
        "recommendation": "" if has_local_signals else "Use local-intent keywords like 'near me', city names, 'serving [area]' naturally in your content.",
    })

    # ── 12. Contact page exists ───────────────────────────
    has_contact = False
    for p in all_pages:
        path = urlparse(p.url).path.lower()
        if "contact" in path:
            has_contact = True
            break
    # Also check navigation links
    if not has_contact and page.soup:
        for a in page.soup.find_all("a", href=True):
            if "contact" in a["href"].lower() or "contact" in a.get_text(strip=True).lower():
                has_contact = True
                break
    checks.append({
        "name": "Contact page accessible",
        "passed": has_contact,
        "weight": 0.5,
        "severity": "warning",
        "message": "Contact page found" if has_contact else "No contact page detected",
        "recommendation": "" if has_contact else "Create a dedicated /contact page with your NAP, map, business hours, and a contact form.",
    })

    return score_category(checks)


def _find_local_schemas(schemas: list) -> list:
    """Find LocalBusiness and subtypes in schema data."""
    local_types = {
        "LocalBusiness", "Restaurant", "Dentist", "Plumber", "Attorney",
        "RealEstateAgent", "AutoRepair", "BeautySalon", "MedicalBusiness",
        "FinancialService", "HomeAndConstructionBusiness", "LegalService",
        "ProfessionalService", "Store", "FoodEstablishment", "HealthAndBeautyBusiness",
        "LodgingBusiness", "SportsActivityLocation", "EntertainmentBusiness",
        "AutomotiveBusiness", "ChildCare", "DryCleaningOrLaundry",
        "EmploymentAgency", "GovernmentOffice", "Library", "RecyclingCenter",
    }
    results = []
    for schema in schemas:
        schema_type = schema.get("@type", "")
        if isinstance(schema_type, list):
            if any(t in local_types for t in schema_type):
                results.append(schema)
        elif schema_type in local_types:
            results.append(schema)
    return results
