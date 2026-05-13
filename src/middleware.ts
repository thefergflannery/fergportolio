import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/admin", "/api/projects", "/api/side-projects", "/api/upload"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Allow the login page and auth API through without checking
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/auth/")) return NextResponse.next();

  const secret = process.env.ADMIN_COOKIE_SECRET;

  // If env vars not configured, block access entirely
  if (!secret) {
    return new NextResponse("Admin not configured — set ADMIN_COOKIE_SECRET.", { status: 503 });
  }

  const session = req.cookies.get("admin_session")?.value;

  if (session !== secret) {
    // API requests get a 401, page requests get a redirect
    if (pathname.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/projects/:path*", "/api/side-projects/:path*", "/api/upload/:path*"],
};