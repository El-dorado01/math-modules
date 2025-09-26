import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  // Exclude requests to static files in the public folder
  const publicFileRegex =
    /^\/(favicon\.ico|logo\.png|robots\.txt|sitemap\.xml|.*\.(css|js|json|jpg|jpeg|png|svg|webp|gif|ico|woff|woff2|ttf|eot|otf|mp4|webm|ogg|mp3|wav|flac|aac|m4a|m3u8|ts|xml|txt))$/;
  if (publicFileRegex.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Skip middleware for the root path (/)
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/number-base-calculator"
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder contents (e.g., /public/*)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public/.*).*)",
  ],
};
