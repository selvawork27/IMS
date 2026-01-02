import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/verify", "/api/auth", "/invoice"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  ) || pathname === "/";

  // Check for session token in cookies - try multiple cookie names
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  if (pathname.startsWith("/api/auth/callback")) {
    return NextResponse.next();
  }

  if (!sessionToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Only redirect authenticated users from /login or root, not from all public routes
  if (sessionToken && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)"],
};

// http://localhost:3001/invoice/cmjd2huaz000312inpqrvxtqo