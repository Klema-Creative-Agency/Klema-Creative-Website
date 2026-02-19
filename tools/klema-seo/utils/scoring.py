"""
Scoring engine for SEO audits.
Converts raw findings into weighted scores with grade labels.
"""

import config


def score_category(checks: list[dict]) -> dict:
    """
    Score a list of checks within a single category.

    Each check dict should have:
      - name:        str   (human-readable label)
      - passed:      bool
      - weight:      float (0.0–1.0, importance within category)
      - severity:    str   ("critical" | "warning" | "info")
      - message:     str   (explanation)
      - recommendation: str (what to fix)
    """
    if not checks:
        return {"score": 0, "grade": "N/A", "checks": []}

    total_weight = sum(c.get("weight", 1.0) for c in checks)
    earned = sum(
        c.get("weight", 1.0) for c in checks if c.get("passed", False)
    )
    score = round((earned / total_weight) * 100) if total_weight else 0

    return {
        "score": score,
        "grade": _grade(score),
        "passed": sum(1 for c in checks if c.get("passed")),
        "failed": sum(1 for c in checks if not c.get("passed")),
        "critical_issues": sum(
            1 for c in checks
            if not c.get("passed") and c.get("severity") == "critical"
        ),
        "checks": checks,
    }


def overall_score(category_scores: dict) -> dict:
    """
    Compute weighted overall score from category results.

    category_scores: {category_name: {"score": int, ...}}
    """
    weights = config.CATEGORY_WEIGHTS
    weighted_sum = 0.0
    weight_total = 0.0

    for cat, result in category_scores.items():
        w = weights.get(cat, 0.05)
        weighted_sum += result["score"] * w
        weight_total += w

    score = round(weighted_sum / weight_total) if weight_total else 0

    # Count totals across all categories
    total_passed = sum(r.get("passed", 0) for r in category_scores.values())
    total_failed = sum(r.get("failed", 0) for r in category_scores.values())
    total_critical = sum(r.get("critical_issues", 0) for r in category_scores.values())

    return {
        "score": score,
        "grade": _grade(score),
        "total_checks": total_passed + total_failed,
        "total_passed": total_passed,
        "total_failed": total_failed,
        "total_critical": total_critical,
        "categories": category_scores,
    }


def _grade(score: int) -> str:
    """Convert numeric score to letter grade."""
    if score >= 95:
        return "A+"
    elif score >= 90:
        return "A"
    elif score >= 85:
        return "A-"
    elif score >= 80:
        return "B+"
    elif score >= 75:
        return "B"
    elif score >= 70:
        return "B-"
    elif score >= 65:
        return "C+"
    elif score >= 60:
        return "C"
    elif score >= 55:
        return "C-"
    elif score >= 50:
        return "D"
    else:
        return "F"


def severity_color(severity: str) -> str:
    """Return color for a severity level (Klema palette)."""
    return {
        "critical": "#f87171",
        "warning":  "#fbbf24",
        "info":     "#60a5fa",
        "pass":     "#4ade80",
    }.get(severity, "rgba(255,255,255,0.45)")


def score_color(score: int) -> str:
    """Return color for a score value (Klema palette)."""
    if score >= 90:
        return "#4ade80"
    elif score >= 70:
        return "#60a5fa"
    elif score >= 50:
        return "#fbbf24"
    else:
        return "#f87171"


def priority_sort(checks: list[dict]) -> list[dict]:
    """Sort checks by priority: failed criticals first, then warnings, then passed."""
    severity_order = {"critical": 0, "warning": 1, "info": 2}

    def sort_key(check):
        passed = 1 if check.get("passed") else 0
        sev = severity_order.get(check.get("severity", "info"), 3)
        return (passed, sev)

    return sorted(checks, key=sort_key)
