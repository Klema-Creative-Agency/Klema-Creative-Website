"""
Module 6 — Image Optimization Analysis
=========================================
Checks: Alt text, file names, file sizes (estimated), lazy loading,
next-gen formats, srcset/responsive, decorative image handling.
"""

import re
from urllib.parse import urlparse, urljoin
from utils.crawler import CrawlResult, extract_images
from utils.scoring import score_category


def analyze(page: CrawlResult) -> dict:
    """Run image optimization checks."""
    if not page.soup:
        return score_category([])

    checks = []
    images = extract_images(page.soup, page.url)
    total = len(images)

    if total == 0:
        checks.append({
            "name": "Images present",
            "passed": False,
            "weight": 0.5,
            "severity": "info",
            "message": "No images found on page",
            "recommendation": "Consider adding relevant images to improve engagement and visual appeal.",
        })
        return score_category(checks)

    # ── 1. Alt text coverage ──────────────────────────────
    with_alt = sum(1 for img in images if img["has_alt"] and img["alt"].strip())
    alt_ratio = with_alt / total if total else 0
    alt_ok = alt_ratio >= 0.9
    checks.append({
        "name": "Image alt text coverage",
        "passed": alt_ok,
        "weight": 1.0,
        "severity": "critical",
        "message": f"{with_alt}/{total} images have alt text ({alt_ratio:.0%})",
        "recommendation": "" if alt_ok else (
            f"{total - with_alt} images are missing alt text. "
            "Add descriptive alt text to every meaningful image for accessibility and SEO."
        ),
    })

    # ── 2. Alt text quality ───────────────────────────────
    bad_alts = []
    for img in images:
        alt = img["alt"].strip().lower()
        if alt and (
            alt in ("image", "photo", "picture", "img", "icon", "logo", "banner", "untitled") or
            len(alt) < 5 or
            alt.startswith("img_") or alt.startswith("dsc_") or
            re.match(r'^[\d_\-\.]+$', alt)
        ):
            bad_alts.append(alt)
    quality_ok = len(bad_alts) == 0
    checks.append({
        "name": "Alt text quality",
        "passed": quality_ok,
        "weight": 0.7,
        "severity": "warning",
        "message": f"{len(bad_alts)} images have poor alt text" if bad_alts else "All alt texts appear descriptive",
        "recommendation": "" if quality_ok else (
            "Replace generic alt text like 'image' or 'photo' with "
            "descriptive text that includes relevant keywords naturally."
        ),
    })

    # ── 3. Descriptive file names ─────────────────────────
    bad_names = []
    for img in images:
        if img["src"]:
            filename = urlparse(img["src"]).path.split("/")[-1].lower()
            if re.match(r'^(img|image|photo|dsc|screenshot)[\d_\-]*\.', filename):
                bad_names.append(filename)
    names_ok = len(bad_names) <= 1
    checks.append({
        "name": "Descriptive file names",
        "passed": names_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"{len(bad_names)} images have generic file names" if bad_names else "Image file names appear descriptive",
        "recommendation": "" if names_ok else (
            "Rename images with descriptive, keyword-rich names: "
            "'plumber-fixing-kitchen-sink.jpg' instead of 'IMG_1234.jpg'."
        ),
    })

    # ── 4. Explicit dimensions ────────────────────────────
    with_dims = sum(1 for img in images if img["width"] and img["height"])
    dims_ratio = with_dims / total if total else 0
    dims_ok = dims_ratio >= 0.7
    checks.append({
        "name": "Explicit width/height attributes",
        "passed": dims_ok,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{with_dims}/{total} images have explicit dimensions",
        "recommendation": "" if dims_ok else (
            "Add width and height attributes to images to prevent layout shift (CLS). "
            "This is a Core Web Vitals factor."
        ),
    })

    # ── 5. Lazy loading ───────────────────────────────────
    with_lazy = sum(1 for img in images if img["loading"] == "lazy")
    # First image shouldn't be lazy (above the fold)
    lazy_ok = with_lazy > 0 if total > 2 else True
    checks.append({
        "name": "Lazy loading implemented",
        "passed": lazy_ok,
        "weight": 0.6,
        "severity": "warning",
        "message": f"{with_lazy}/{total} images use lazy loading",
        "recommendation": "" if lazy_ok else (
            "Add loading='lazy' to below-the-fold images. "
            "Keep above-the-fold images eager for fast LCP."
        ),
    })

    # ── 6. Next-gen formats ───────────────────────────────
    next_gen_exts = {".webp", ".avif", ".svg"}
    next_gen_count = 0
    for img in images:
        if img["src"]:
            ext = "." + urlparse(img["src"]).path.split(".")[-1].lower() if "." in img["src"] else ""
            if ext in next_gen_exts:
                next_gen_count += 1
    ng_ratio = next_gen_count / total if total else 0
    ng_ok = ng_ratio >= 0.3
    checks.append({
        "name": "Next-gen image formats (WebP/AVIF)",
        "passed": ng_ok,
        "weight": 0.5,
        "severity": "info",
        "message": f"{next_gen_count}/{total} images use next-gen formats ({ng_ratio:.0%})",
        "recommendation": "" if ng_ok else (
            "Convert images to WebP or AVIF format for 25-50% smaller file sizes "
            "with identical quality. Serve with <picture> fallbacks."
        ),
    })

    # ── 7. Responsive images (srcset) ─────────────────────
    with_srcset = sum(1 for img in images if img["srcset"])
    srcset_ok = with_srcset > 0 if total > 1 else True
    checks.append({
        "name": "Responsive images (srcset)",
        "passed": srcset_ok,
        "weight": 0.4,
        "severity": "info",
        "message": f"{with_srcset}/{total} images use srcset",
        "recommendation": "" if srcset_ok else (
            "Use srcset and sizes attributes to serve appropriately sized images "
            "for different screen widths. Saves bandwidth on mobile."
        ),
    })

    # ── 8. Not too many images ────────────────────────────
    not_excessive = total <= 50
    checks.append({
        "name": "Reasonable image count",
        "passed": not_excessive,
        "weight": 0.3,
        "severity": "warning" if not not_excessive else "info",
        "message": f"{total} images on page",
        "recommendation": "" if not_excessive else (
            f"{total} images is excessive. Reduce to essential images "
            "and use CSS for decorative elements."
        ),
    })

    return score_category(checks)
