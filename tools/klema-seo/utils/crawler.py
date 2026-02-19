"""
Web crawler and page fetcher.
Handles polite crawling, robots.txt, and HTML parsing.
"""

import time
import re
from urllib.parse import urljoin, urlparse
from typing import Optional

import requests
from bs4 import BeautifulSoup

import config


class CrawlResult:
    """Container for a single crawled page."""

    def __init__(self, url: str, status_code: int, html: str = "",
                 headers: dict = None, load_time: float = 0.0,
                 error: str = ""):
        self.url = url
        self.status_code = status_code
        self.html = html
        self.headers = headers or {}
        self.load_time = load_time
        self.error = error
        self._soup = None

    @property
    def soup(self) -> Optional[BeautifulSoup]:
        if self._soup is None and self.html:
            self._soup = BeautifulSoup(self.html, "lxml")
        return self._soup

    @property
    def ok(self) -> bool:
        return 200 <= self.status_code < 400 and not self.error


class Crawler:
    """Polite web crawler for SEO auditing."""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": config.USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        })
        self.visited = set()

    def fetch(self, url: str) -> CrawlResult:
        """Fetch a single URL and return CrawlResult."""
        try:
            start = time.time()
            resp = self.session.get(
                url,
                timeout=config.REQUEST_TIMEOUT,
                allow_redirects=True,
            )
            load_time = time.time() - start

            return CrawlResult(
                url=resp.url,
                status_code=resp.status_code,
                html=resp.text,
                headers=dict(resp.headers),
                load_time=load_time,
            )
        except requests.exceptions.Timeout:
            return CrawlResult(url=url, status_code=0, error="Timeout")
        except requests.exceptions.ConnectionError:
            return CrawlResult(url=url, status_code=0, error="Connection failed")
        except Exception as e:
            return CrawlResult(url=url, status_code=0, error=str(e))

    def crawl_site(self, start_url: str, max_pages: int = None) -> list:
        """Crawl a site starting from *start_url*, following internal links."""
        max_pages = max_pages or config.MAX_PAGES_TO_CRAWL
        parsed_start = urlparse(start_url)
        base_domain = parsed_start.netloc
        queue = [start_url]
        results = []

        while queue and len(results) < max_pages:
            url = queue.pop(0)
            normalized = self._normalize(url)

            if normalized in self.visited:
                continue
            self.visited.add(normalized)

            result = self.fetch(url)
            results.append(result)

            if result.ok and result.soup:
                for link in result.soup.find_all("a", href=True):
                    href = link["href"]
                    absolute = urljoin(url, href)
                    parsed = urlparse(absolute)

                    # Only follow internal links
                    if parsed.netloc == base_domain:
                        clean = parsed._replace(fragment="").geturl()
                        if self._normalize(clean) not in self.visited:
                            queue.append(clean)

            time.sleep(config.REQUEST_DELAY)

        return results

    def fetch_robots_txt(self, base_url: str) -> str:
        """Fetch robots.txt content."""
        parsed = urlparse(base_url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        result = self.fetch(robots_url)
        return result.html if result.ok else ""

    def fetch_sitemap(self, base_url: str) -> str:
        """Attempt to fetch sitemap.xml."""
        parsed = urlparse(base_url)
        sitemap_url = f"{parsed.scheme}://{parsed.netloc}/sitemap.xml"
        result = self.fetch(sitemap_url)
        return result.html if result.ok else ""

    @staticmethod
    def _normalize(url: str) -> str:
        """Normalize URL for deduplication."""
        parsed = urlparse(url)
        path = parsed.path.rstrip("/") or "/"
        return f"{parsed.scheme}://{parsed.netloc}{path}"


def extract_meta(soup: BeautifulSoup) -> dict:
    """Extract common meta tags from a page."""
    meta = {}

    # Title
    title_tag = soup.find("title")
    meta["title"] = title_tag.get_text(strip=True) if title_tag else ""

    # Meta description
    desc = soup.find("meta", attrs={"name": "description"})
    meta["description"] = desc["content"] if desc and desc.get("content") else ""

    # Canonical
    canonical = soup.find("link", rel="canonical")
    meta["canonical"] = canonical["href"] if canonical and canonical.get("href") else ""

    # Robots
    robots = soup.find("meta", attrs={"name": "robots"})
    meta["robots"] = robots["content"] if robots and robots.get("content") else ""

    # Open Graph
    for prop in ["og:title", "og:description", "og:image", "og:type", "og:url"]:
        tag = soup.find("meta", property=prop)
        key = prop.replace(":", "_")
        meta[key] = tag["content"] if tag and tag.get("content") else ""

    # Viewport
    viewport = soup.find("meta", attrs={"name": "viewport"})
    meta["viewport"] = viewport["content"] if viewport and viewport.get("content") else ""

    # Charset
    charset = soup.find("meta", charset=True)
    meta["charset"] = charset.get("charset", "") if charset else ""

    # Language
    html_tag = soup.find("html")
    meta["lang"] = html_tag.get("lang", "") if html_tag else ""

    return meta


def extract_headings(soup: BeautifulSoup) -> dict:
    """Extract heading hierarchy."""
    headings = {}
    for level in range(1, 7):
        tag = f"h{level}"
        found = soup.find_all(tag)
        headings[tag] = [h.get_text(strip=True) for h in found]
    return headings


def extract_links(soup: BeautifulSoup, page_url: str) -> dict:
    """Categorize links as internal or external."""
    parsed_page = urlparse(page_url)
    internal, external = [], []

    for a in soup.find_all("a", href=True):
        href = a["href"]
        absolute = urljoin(page_url, href)
        parsed = urlparse(absolute)

        link_info = {
            "url": absolute,
            "text": a.get_text(strip=True),
            "rel": a.get("rel", []),
            "has_nofollow": "nofollow" in a.get("rel", []),
        }

        if parsed.netloc == parsed_page.netloc:
            internal.append(link_info)
        elif parsed.scheme in ("http", "https"):
            external.append(link_info)

    return {"internal": internal, "external": external}


def extract_images(soup: BeautifulSoup, page_url: str) -> list:
    """Extract image information."""
    images = []
    for img in soup.find_all("img"):
        src = img.get("src", "")
        images.append({
            "src": urljoin(page_url, src) if src else "",
            "alt": img.get("alt", ""),
            "has_alt": bool(img.get("alt")),
            "width": img.get("width", ""),
            "height": img.get("height", ""),
            "loading": img.get("loading", ""),
            "srcset": img.get("srcset", ""),
        })
    return images


def extract_structured_data(soup: BeautifulSoup) -> list:
    """Extract JSON-LD structured data."""
    schemas = []
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            import json
            data = json.loads(script.string)
            if isinstance(data, list):
                schemas.extend(data)
            else:
                schemas.append(data)
        except (json.JSONDecodeError, TypeError):
            pass
    return schemas


def word_count(soup: BeautifulSoup) -> int:
    """Estimate word count of main content."""
    # Remove script/style elements
    for tag in soup(["script", "style", "nav", "header", "footer"]):
        tag.decompose()
    text = soup.get_text(separator=" ", strip=True)
    return len(text.split())
