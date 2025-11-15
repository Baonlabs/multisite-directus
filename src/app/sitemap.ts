import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getAllArticles, getAllTags, getCategories } from "@/lib/directus-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const hostname = headersList.get("host") || "";

    const entries: MetadataRoute.Sitemap = [
        { url: `${hostname}/`, lastModified: new Date() },
        { url: `${hostname}/about`, lastModified: new Date() },
        { url: `${hostname}/contact`, lastModified: new Date() },
    ];
    switch ((hostname || "")) {
      case (process.env.DOMAIN_1 || ""): {
        const articles = await getAllArticles();
        for (const a of articles) {
          if (!a.slug) continue;
          entries.push({ url: `${hostname}/${a.slug}`, lastModified: new Date() });
        }
        const tags = await getAllTags();
        for (const t of tags) {
          if (!t.slug) continue;
          entries.push({ url: `${hostname}/articles/tag/${t.slug}`, lastModified: new Date() });
        }
        const categories = await getCategories();
        for (const c of categories) {
          if (!c.slug) continue;
          console.log(c.slug);
          console.log(encodeURI(`${hostname}/articles/category/${encodeURIComponent(c.slug)}`));
          entries.push({ url: encodeURI(`${hostname}/articles/category/${encodeURIComponent(c.slug)}`), lastModified: new Date() });
        }
        break;
      }
      case (process.env.DOMAIN_2 || ""): {
        const categories = await getCategories();
        for (const c of categories) {
          if (!c.slug) continue;
          entries.push({ url: encodeURI(`${hostname}/articles/category/${encodeURIComponent(c.slug)}`), lastModified: new Date() });
        }
        const articles = await getAllArticles();
        for (const a of articles) {
          if (!a.slug) continue;
          entries.push({ url: encodeURI(`${hostname}/articles/${a.slug}`)   , lastModified: new Date() });
        }
        break;
      }
      default: {
        // Giữ các entry tĩnh cơ bản cho domain không xác định
        break;
      }
    }


  return entries;
}