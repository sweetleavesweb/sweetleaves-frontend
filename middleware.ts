import { NextRequest, NextResponse } from "next/server";

const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function middleware(request: NextRequest) {
  if (!canonicalUrl) return;

  const host = request.headers.get("host") || "";
  if (host.endsWith(".vercel.app") || host.startsWith("localhost")) return;

  const canonical = new URL(canonicalUrl);
  if (host === canonical.host) return;

  const url = request.nextUrl.clone();
  url.host = canonical.host;
  url.protocol = canonical.protocol;
  url.port = canonical.port;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf)).*)",
  ],
};
