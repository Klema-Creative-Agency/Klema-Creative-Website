"""
Klema SEO Audit Service — Configuration
========================================
Customize branding, scoring weights, and default settings.
"""

# ── Branding ─────────────────────────────────────────────
AGENCY_NAME = "Klema Creative"
AGENCY_URL = "https://klemacreative.com"
AGENCY_EMAIL = "tamaya@klemacreative.com"
AGENCY_LOGO_URL = ""  # Optional: URL or local path to your logo

# ── Scoring weights (must sum to 1.0) ───────────────────
CATEGORY_WEIGHTS = {
    "technical":   0.12,
    "onpage":      0.12,
    "local_seo":   0.15,   # Higher weight — local business focus
    "schema":      0.08,
    "content":     0.10,
    "images":      0.06,
    "sitemap":     0.05,
    "geo":         0.10,   # AI search visibility matters
    "competitor":  0.08,
    "pagespeed":   0.06,
    "mobile":      0.05,
    "reputation":  0.03,
}

# ── Crawl settings ───────────────────────────────────────
MAX_PAGES_TO_CRAWL = 500
REQUEST_TIMEOUT = 15          # seconds
REQUEST_DELAY = 1.0           # seconds between requests (be polite)
USER_AGENT = (
    "Mozilla/5.0 (compatible; KlemaSEOBot/1.0; "
    "+https://klemacreative.com/seo-audit)"
)

# ── Score thresholds ─────────────────────────────────────
SCORE_THRESHOLDS = {
    "excellent": 90,
    "good":      70,
    "needs_work": 50,
    "poor":       0,
}

# ── Report settings ──────────────────────────────────────
REPORT_OUTPUT_DIR = "reports"
INCLUDE_COMPETITOR_ANALYSIS = True
MAX_COMPETITORS = 3

# ── Local SEO specific ──────────────────────────────────
CHECK_NAP_CONSISTENCY = True
LOCAL_SCHEMA_TYPES = [
    "LocalBusiness", "Restaurant", "Dentist", "Plumber",
    "Attorney", "RealEstateAgent", "AutoRepair",
    "BeautySalon", "MedicalBusiness", "FinancialService",
    "HomeAndConstructionBusiness", "LegalService",
    "ProfessionalService", "Store",
]
