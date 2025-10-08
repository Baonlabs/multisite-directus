import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host")?.split(":")[0] || "";

  // Bỏ qua file tĩnh và Next.js assets
  if (url.pathname.startsWith("/_next") || url.pathname.includes(".")) {
    return;
  }

  // Luôn rewrite domain sang /[domain]
  console.log("🌐 Hostname:", hostname);
  url.pathname = `/${hostname}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*",
};
