import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const rawHost = req.headers.get("host") || "";
  const hostname = rawHost.split(":")[0].trim().toLowerCase();

  // Bỏ qua file tĩnh và Next.js assets
  if (url.pathname.startsWith("/_next") || url.pathname.includes(".")) {
    return NextResponse.next();
  }

  // Không rewrite để tránh ảnh hưởng đến routing App Router
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
