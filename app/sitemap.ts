import type { MetadataRoute } from "next";

const SITE = "https://nexora-ai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/#features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/#pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/#proof`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
