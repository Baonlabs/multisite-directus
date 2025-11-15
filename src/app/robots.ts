import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const hostname = headersList.get("host") || "";

    let rules: MetadataRoute.Robots["rules"] = [];
    const sitemap = `https://${hostname}/sitemap.xml`;
    switch ((hostname|| "")) {
        case process.env.DOMAIN_1:
            rules = [
                {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api/private"],
                },
            ];
            // sitemap = "https://bao1.com/sitemap.xml";
            break;

        case process.env.DOMAIN_2:
            rules = [
                {
                userAgent: "*",
                allow: "/",
                disallow: ["/auth", "/checkout"],
                },
            ];
            // sitemap = "https://chanhtuoi.com/sitemap.xml";
            break;

        default:
        rules = [
            {
            userAgent: "*",
            allow: "/",
            },
        ];
    }
    return {
        rules,
        sitemap
        // host: baseUrl, // bật nếu muốn chỉ định canonical host
    };
}
