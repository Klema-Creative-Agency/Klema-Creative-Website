"""
Dashboard report generator.
Produces a single-file HTML dashboard from audit results.
"""

import os
import json
from datetime import datetime
from utils.scoring import score_color, severity_color, priority_sort

import config


# ── Category display metadata ────────────────────────────
CATEGORY_META = {
    "technical":  {"icon": "&#9881;",  "label": "Technical SEO",        "desc": "Server, security, and crawlability"},
    "onpage":     {"icon": "&#128196;","label": "On-Page SEO",          "desc": "Titles, descriptions, headings, links"},
    "local_seo":  {"icon": "&#128205;","label": "Local SEO",            "desc": "NAP, schema, maps, service areas"},
    "schema":     {"icon": "&#128218;","label": "Schema Markup",        "desc": "Structured data coverage and quality"},
    "content":    {"icon": "&#9997;",  "label": "Content & E-E-A-T",   "desc": "Content quality, expertise, trust"},
    "images":     {"icon": "&#128247;","label": "Image Optimization",   "desc": "Alt text, formats, responsive images"},
    "sitemap":    {"icon": "&#128506;","label": "Sitemap",              "desc": "Sitemap.xml coverage and quality"},
    "geo":        {"icon": "&#129302;","label": "AI Search (GEO)",      "desc": "Visibility in AI-powered search"},
    "competitor": {"icon": "&#9876;",  "label": "Competitive Analysis", "desc": "How you compare to competitors"},
    "pagespeed":  {"icon": "&#9889;",  "label": "Page Speed",           "desc": "Loading performance and optimization"},
    "mobile":     {"icon": "&#128241;","label": "Mobile UX",            "desc": "Mobile-friendliness and usability"},
    "reputation": {"icon": "&#11088;", "label": "Reputation & Reviews", "desc": "Reviews, social proof, trust signals"},
}


def generate_dashboard(audit_results: dict, url: str, client_name: str = "") -> str:
    """Generate the complete HTML dashboard."""
    overall = audit_results
    categories = overall["categories"]
    now = datetime.now().strftime("%B %d, %Y at %I:%M %p")

    # Build category cards HTML
    category_cards = ""
    category_details = ""
    for cat_key, cat_result in categories.items():
        meta = CATEGORY_META.get(cat_key, {"icon": "&#9679;", "label": cat_key, "desc": ""})
        color = score_color(cat_result["score"])
        category_cards += _category_card(cat_key, meta, cat_result, color)
        category_details += _category_detail(cat_key, meta, cat_result, color)

    # Priority recommendations
    all_failed = []
    for cat_key, cat_result in categories.items():
        meta = CATEGORY_META.get(cat_key, {"icon": "", "label": cat_key, "desc": ""})
        for check in cat_result.get("checks", []):
            if not check.get("passed"):
                all_failed.append({**check, "category": meta["label"]})

    # Sort by severity
    sev_order = {"critical": 0, "warning": 1, "info": 2}
    all_failed.sort(key=lambda c: sev_order.get(c.get("severity", "info"), 3))
    priority_html = _priority_section(all_failed[:15])

    # Overall score ring color and offset
    ring_color = score_color(overall["score"])
    circumference = 534
    score_offset = int(circumference - (overall["score"] / 100 * circumference))

    html = _TEMPLATE.format(
        agency_name=config.AGENCY_NAME,
        agency_url=config.AGENCY_URL,
        agency_email=config.AGENCY_EMAIL,
        client_name=client_name or url,
        url=url,
        date=now,
        overall_score=overall["score"],
        overall_grade=overall["grade"],
        total_checks=overall["total_checks"],
        total_passed=overall["total_passed"],
        total_failed=overall["total_failed"],
        total_critical=overall["total_critical"],
        ring_color=ring_color,
        score_offset=score_offset,
        category_cards=category_cards,
        category_details=category_details,
        priority_recommendations=priority_html,
    )

    return html


def save_dashboard(html: str, filename: str = ""):
    """Save dashboard HTML to the reports directory."""
    os.makedirs(config.REPORT_OUTPUT_DIR, exist_ok=True)
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"seo_audit_{timestamp}.html"
    filepath = os.path.join(config.REPORT_OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
    return filepath


def _category_card(key: str, meta: dict, result: dict, color: str) -> str:
    score = result["score"]
    return f"""
    <div class="cat-card" onclick="showDetail('{key}')">
      <div class="cat-icon">{meta['icon']}</div>
      <div class="cat-info">
        <div class="cat-label">{meta['label']}</div>
        <div class="cat-desc">{meta['desc']}</div>
      </div>
      <div class="cat-score" style="color:{color}">
        <div class="cat-score-num">{score}</div>
        <div class="cat-score-bar">
          <div class="cat-score-fill" style="width:{score}%;background:{color}"></div>
        </div>
      </div>
    </div>"""


def _category_detail(key: str, meta: dict, result: dict, color: str) -> str:
    checks_html = ""
    sorted_checks = priority_sort(result.get("checks", []))
    for check in sorted_checks:
        passed = check.get("passed", False)
        sev = check.get("severity", "info")
        icon = "&#10003;" if passed else ("&#10007;" if sev == "critical" else "&#9888;")
        status_class = "pass" if passed else sev
        rec = check.get("recommendation", "")
        rec_html = f'<div class="check-rec">{rec}</div>' if rec else ""
        checks_html += f"""
        <div class="check-item {status_class}">
          <span class="check-icon">{icon}</span>
          <div class="check-body">
            <div class="check-name">{check['name']}</div>
            <div class="check-msg">{check.get('message', '')}</div>
            {rec_html}
          </div>
        </div>"""

    return f"""
    <div class="cat-detail" id="detail-{key}" style="display:none">
      <div class="detail-header">
        <span class="detail-icon">{meta['icon']}</span>
        <h2>{meta['label']}</h2>
        <span class="detail-score" style="color:{color}">{result['score']}/100</span>
        <button class="close-btn" onclick="hideDetail('{key}')">&times;</button>
      </div>
      <div class="detail-summary">
        {result.get('passed',0)} passed &middot; {result.get('failed',0)} failed &middot;
        {result.get('critical_issues',0)} critical
      </div>
      <div class="checks-list">
        {checks_html}
      </div>
    </div>"""


def _priority_section(failed_checks: list) -> str:
    if not failed_checks:
        return "<p>No critical issues found. Great job!</p>"

    html = ""
    for i, check in enumerate(failed_checks, 1):
        sev = check.get("severity", "info")
        sev_label = sev.upper()
        sev_cls = sev
        rec = check.get("recommendation", check.get("message", ""))
        html += f"""
        <div class="priority-item {sev_cls}">
          <span class="priority-num">{i}</span>
          <div class="priority-body">
            <div class="priority-title">
              <span class="sev-badge {sev_cls}">{sev_label}</span>
              {check['name']}
              <span class="priority-cat">({check.get('category', '')})</span>
            </div>
            <div class="priority-rec">{rec}</div>
          </div>
        </div>"""
    return html


# ── HTML Template (Klema Creative design system) ─────────
_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEO Audit — {client_name} | {agency_name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{
  --bg:#050505;--surface:#0d0d0d;--card:#111111;--card-hover:#161616;
  --text:#f0eeeb;--text-mid:rgba(255,255,255,0.7);--text-dim:rgba(255,255,255,0.45);
  --accent:#4ade80;--accent-dim:rgba(74,222,128,0.12);--accent-glow:rgba(74,222,128,0.08);
  --accent-border:rgba(74,222,128,0.2);--accent-border-lt:rgba(74,222,128,0.15);
  --blue:#60a5fa;--blue-dim:rgba(96,165,250,0.12);
  --amber:#fbbf24;--amber-dim:rgba(251,191,36,0.12);
  --red:#f87171;--red-dim:rgba(248,113,113,0.12);
  --purple:#a78bfa;--purple-dim:rgba(167,139,250,0.12);
  --border:rgba(255,255,255,0.06);--border-hover:rgba(255,255,255,0.1);--border-subtle:rgba(255,255,255,0.12);
}}
body{{font-family:"Inter",system-ui,sans-serif;background:var(--bg);color:var(--text);
  line-height:1.7;min-height:100vh;-webkit-font-smoothing:antialiased;font-size:14.5px}}
a{{color:var(--accent);text-decoration:none}}
a:hover{{text-decoration:underline}}

/* Header */
.header{{background:var(--surface);padding:1.75rem 2rem;border-bottom:1px solid var(--border)}}
.header-inner{{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}}
.brand{{font-size:1.1rem;font-weight:800;color:var(--text);letter-spacing:-0.5px;display:flex;align-items:center;gap:0.5rem}}
.brand-dot{{width:8px;height:8px;border-radius:50%;background:var(--accent);
  box-shadow:0 0 12px var(--accent),0 0 40px rgba(74,222,128,0.2)}}
.audit-meta{{color:var(--text-dim);font-size:0.8rem;text-align:right}}
.audit-label{{font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);margin-bottom:2px}}

/* Hero score */
.hero{{max-width:1200px;margin:0 auto;padding:2.5rem 2rem;display:flex;gap:2.5rem;align-items:center;flex-wrap:wrap}}
.score-ring{{width:180px;height:180px;position:relative;flex-shrink:0}}
.score-ring svg{{width:100%;height:100%;transform:rotate(-90deg)}}
.score-ring circle{{fill:none;stroke-width:8}}
.score-bg{{stroke:var(--card)}}
.score-fg{{stroke-linecap:round;transition:stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)}}
.score-text{{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}}
.score-num{{font-size:3rem;font-weight:800;line-height:1;letter-spacing:-1.5px}}
.score-grade{{font-size:1.1rem;font-weight:600;color:var(--text-dim);margin-top:4px}}
.hero-stats{{flex:1;min-width:250px}}
.hero-url{{font-size:1.25rem;font-weight:800;margin-bottom:0.25rem;word-break:break-all;letter-spacing:-0.5px}}
.hero-client{{color:var(--text-dim);font-size:0.9rem;margin-bottom:1rem}}
.stat-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0.75rem}}
.stat-box{{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:1rem;text-align:center;
  transition:background 0.4s}}
.stat-box:hover{{background:var(--card-hover)}}
.stat-val{{font-size:1.5rem;font-weight:800;letter-spacing:-0.5px}}
.stat-label{{font-size:0.65rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.15em;margin-top:2px}}

/* Category cards */
.section{{max-width:1200px;margin:0 auto;padding:1.5rem 2rem}}
.section-title{{font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);
  margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border)}}
.cat-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:0.75rem}}
.cat-card{{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1rem 1.25rem;
  display:flex;align-items:center;gap:1rem;cursor:pointer;transition:background 0.4s,border-color 0.3s,transform 0.3s}}
.cat-card:hover{{border-color:var(--border-hover);background:var(--card);transform:translateY(-2px)}}
.cat-icon{{font-size:1.3rem;width:48px;height:48px;border-radius:12px;background:var(--accent-dim);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:box-shadow 0.3s}}
.cat-card:hover .cat-icon{{box-shadow:0 0 20px rgba(74,222,128,0.15)}}
.cat-info{{flex:1;min-width:0}}
.cat-label{{font-weight:600;font-size:0.9rem;color:var(--text)}}
.cat-desc{{font-size:0.75rem;color:var(--text-dim);margin-top:1px}}
.cat-score{{text-align:right;min-width:60px}}
.cat-score-num{{font-size:1.4rem;font-weight:800;letter-spacing:-0.5px}}
.cat-score-bar{{width:60px;height:3px;background:var(--card);border-radius:2px;margin-top:4px}}
.cat-score-fill{{height:100%;border-radius:2px;transition:width 0.8s cubic-bezier(0.22,1,0.36,1)}}

/* Detail panels */
.cat-detail{{background:var(--surface);border:1px solid var(--border);border-radius:16px;
  margin-top:1rem;padding:1.75rem;animation:slideIn .5s cubic-bezier(0.22,1,0.36,1)}}
@keyframes slideIn{{from{{opacity:0;transform:translateY(28px)}}to{{opacity:1;transform:translateY(0)}}}}
.detail-header{{display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;flex-wrap:wrap}}
.detail-header h2{{flex:1;font-size:1.15rem;font-weight:800;letter-spacing:-0.5px}}
.detail-icon{{font-size:1.3rem;width:40px;height:40px;border-radius:10px;background:var(--accent-dim);
  display:flex;align-items:center;justify-content:center}}
.detail-score{{font-size:1.4rem;font-weight:800;letter-spacing:-0.5px}}
.close-btn{{background:none;border:1px solid var(--border);color:var(--text-dim);font-size:1.3rem;
  cursor:pointer;width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;
  transition:all 0.3s}}
.close-btn:hover{{background:var(--card);color:var(--text);border-color:var(--border-hover)}}
.detail-summary{{font-size:0.8rem;color:var(--text-dim);margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border)}}
.checks-list{{display:flex;flex-direction:column;gap:0.5rem}}
.check-item{{display:flex;gap:0.75rem;padding:0.75rem 1rem;border-radius:12px;background:var(--bg);
  border:1px solid var(--border);transition:background 0.4s}}
.check-item:hover{{background:var(--card)}}
.check-item.pass{{border-left:3px solid var(--accent)}}
.check-item.critical{{border-left:3px solid var(--red);background:rgba(248,113,113,0.04)}}
.check-item.warning{{border-left:3px solid var(--amber);background:rgba(251,191,36,0.03)}}
.check-item.info{{border-left:3px solid var(--blue)}}
.check-icon{{font-size:1rem;width:20px;text-align:center;flex-shrink:0;margin-top:2px}}
.check-item.pass .check-icon{{color:var(--accent)}}
.check-item.critical .check-icon{{color:var(--red)}}
.check-item.warning .check-icon{{color:var(--amber)}}
.check-item.info .check-icon{{color:var(--blue)}}
.check-body{{flex:1;min-width:0}}
.check-name{{font-weight:600;font-size:0.85rem;color:var(--text)}}
.check-msg{{font-size:0.8rem;color:var(--text-dim);margin-top:2px}}
.check-rec{{font-size:0.8rem;color:var(--accent);margin-top:6px;padding:8px 12px;
  background:var(--accent-glow);border-radius:10px;border:1px solid var(--accent-border-lt);line-height:1.5}}

/* Priority section */
.priority-item{{display:flex;gap:0.75rem;padding:0.85rem 1.1rem;background:var(--surface);
  border:1px solid var(--border);border-radius:12px;margin-bottom:0.5rem;transition:background 0.4s}}
.priority-item:hover{{background:var(--card)}}
.priority-item.critical{{border-left:3px solid var(--red)}}
.priority-item.warning{{border-left:3px solid var(--amber)}}
.priority-item.info{{border-left:3px solid var(--blue)}}
.priority-num{{font-size:1rem;font-weight:800;color:var(--text-dim);width:24px;text-align:center;flex-shrink:0}}
.priority-body{{flex:1}}
.priority-title{{font-weight:600;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap}}
.priority-cat{{font-size:0.7rem;color:var(--text-dim);font-weight:400}}
.priority-rec{{font-size:0.8rem;color:var(--text-dim);margin-top:4px;line-height:1.5}}
.sev-badge{{font-size:0.6rem;font-weight:700;padding:3px 8px;border-radius:9999px;text-transform:uppercase;letter-spacing:0.5px}}
.sev-badge.critical{{background:var(--red-dim);color:var(--red)}}
.sev-badge.warning{{background:var(--amber-dim);color:var(--amber)}}
.sev-badge.info{{background:var(--blue-dim);color:var(--blue)}}

/* Footer */
.footer{{max-width:1200px;margin:0 auto;padding:2.5rem 2rem;text-align:center;color:var(--text-dim);
  font-size:0.8rem;border-top:1px solid var(--border);margin-top:2rem}}
.footer a{{color:var(--accent)}}

/* Print */
@media print{{
  body{{background:#fff;color:#111}}
  .header{{background:#0d0d0d!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  .cat-card,.check-item,.priority-item,.stat-box{{break-inside:avoid}}
}}
@media(max-width:600px){{
  .hero{{flex-direction:column;align-items:center;text-align:center;padding:1.5rem 1.25rem}}
  .cat-grid{{grid-template-columns:1fr}}
  .header-inner{{flex-direction:column;text-align:center}}
  .section{{padding:1.25rem}}
}}
</style>
</head>
<body>

<div class="header">
  <div class="header-inner">
    <div class="brand"><span class="brand-dot"></span>{agency_name}</div>
    <div class="audit-meta">
      <div class="audit-label">SEO Audit Report</div>
      {date}
    </div>
  </div>
</div>

<div class="hero">
  <div class="score-ring">
    <svg viewBox="0 0 200 200">
      <circle class="score-bg" cx="100" cy="100" r="85"/>
      <circle class="score-fg" cx="100" cy="100" r="85"
        stroke="{ring_color}"
        stroke-dasharray="534"
        stroke-dashoffset="{score_offset}"/>
    </svg>
    <div class="score-text">
      <div class="score-num" style="color:{ring_color}">{overall_score}</div>
      <div class="score-grade">{overall_grade}</div>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hero-url">{url}</div>
    <div class="hero-client">{client_name}</div>
    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-val">{total_checks}</div>
        <div class="stat-label">Checks Run</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--accent)">{total_passed}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--red)">{total_failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--red)">{total_critical}</div>
        <div class="stat-label">Critical</div>
      </div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Category Scores</div>
  <div class="cat-grid">
    {category_cards}
  </div>
  {category_details}
</div>

<div class="section">
  <div class="section-title">Priority Recommendations</div>
  {priority_recommendations}
</div>

<div class="footer">
  <p>Prepared by <a href="{agency_url}">{agency_name}</a> &middot; <a href="mailto:{agency_email}">{agency_email}</a></p>
  <p style="margin-top:0.5rem;font-size:0.7rem">This report was generated by an automated SEO audit tool. For personalized recommendations, contact us.</p>
</div>

<script>
function showDetail(key) {{
  document.querySelectorAll('.cat-detail').forEach(d => d.style.display = 'none');
  const el = document.getElementById('detail-' + key);
  if (el) {{
    el.style.display = 'block';
    el.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
  }}
}}
function hideDetail(key) {{
  const el = document.getElementById('detail-' + key);
  if (el) el.style.display = 'none';
}}
</script>
</body>
</html>"""


def _build_dashboard(audit_results, url, client_name):
    """Wrapper that calculates derived values and calls generate_dashboard."""
    # Calculate score ring offset
    score = audit_results["score"]
    circumference = 534  # 2 * pi * 85
    offset = circumference - (score / 100 * circumference)

    html = generate_dashboard(audit_results, url, client_name)
    # Replace the score offset placeholder
    html = html.replace("{score_offset}", str(int(offset)))
    return html
