import { domains } from "@/app/domains";
import { headers } from "next/headers";
import Hero from "@/configuration/TechNova/components/Hero";
import Stats from "@/configuration/TechNova/components/Stats";
import PopularArticles from "@/configuration/TechNova/components/PopularArticles";
import ExploreCategories from "@/configuration/TechNova/components/ExploreCategories";
import JoinCommunity from "@/configuration/TechNova/components/JoinCommunity";

export default async function Page() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const config = domains[hostname] || { title: "Website" };
  
  console.log("🌐 Hostname 123:", hostname);
  switch (hostname) {
    case process.env.DOMAIN_1:
      return (
        <div className="bg-gray-900 min-h-screen">
          <Hero />
          <Stats />
          <PopularArticles />
          <ExploreCategories />
          <JoinCommunity />
        </div>
      );
    case process.env.DOMAIN_2:
      return (
        <div>
          <h2>Xin chào từ {config.title} </h2>
          <p>Bạn đang truy cập vào domain 2: {hostname}</p>
        </div>
      );
    default:
      return (
        <div>
          <h2>Xin chào từ {config.title}</h2>
          <p>Bạn đang truy cập vào domain---3: {hostname}</p>
        </div>
      );
  }

}
