import "./globals.css";
import { headers } from "next/headers";
import { domains } from "@/app/domains";
import Header from "@/configuration/TechNova/components/Header";

export const metadata = {
  title: "Multi Website",
  description: "Demo multi-domain layout",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const hostname = headersList.get("host") || "";
  const config = domains[hostname] || { title: "Website", theme: "default" };

  let header, footer;
  console.log("🌐 Hostname----layout:", hostname);

  switch (hostname) {
    case process.env.DOMAIN_1:
      header = <Header />; // Sử dụng TechNova Header component
      footer = (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">TechNova</h3>
                <p className="text-sm leading-relaxed">
                  Discover cutting-edge technology insights and innovations that shape tomorrow's digital landscape.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">About</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <p className="text-sm">
                  📧 hello@technova.com<br/>
                  🌐 www.technova.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>© 2025 TechNova - All rights reserved</p>
            </div>
          </div>
        </footer>
      );
      break;

    case process.env.DOMAIN_2:
      header = (
        <header className="bg-green-600 text-white p-4">
          <h1>{config.title} - Domain 2</h1>
        </header>
      );
      footer = (
        <footer className="bg-green-900 text-white p-4 text-center">
          <p>Contact us at {hostname}</p>
        </footer>
      );
      break;

    default:
      header = (
        <header className="bg-gray-600 text-white p-4">
          <h1>{config.title} - Default</h1>
        </header>
      );
      footer = (
        <footer className="bg-gray-900 text-white p-4 text-center">
          <p>Default footer for all domains</p>
        </footer>
      );
      break;
  }

  return (

      <body className="bg-gray-900">
        {header}
        <main className={hostname === process.env.DOMAIN_1 ? "" : "min-h-screen p-6"}>{children}</main>
        {footer}
      </body>

  );
}
