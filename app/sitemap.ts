import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://klemacreative.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/packages`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/ai-visibility`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/web-engineering`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/foundation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/accelerator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/authority`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/dominator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/ai-lead-engine`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/ai-lead-engine/hvac`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/ai-lead-engine/dental`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/ai-lead-engine/plumbing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/ai-lead-engine/roofing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/ai-lead-engine/tree-removal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
