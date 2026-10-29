import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const staticPaths = [
  "/",
  "/features",
  "/pricing",
  "/security",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/shipping-and-delivery",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: site.lastUpdated,
    changeFrequency: path === "/" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/pricing" ? 0.9 : 0.6,
  }));
}
