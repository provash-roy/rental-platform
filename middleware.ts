import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const isLoggedIn = !!token;

    const publicRoutes = ["/"];
    const authRoutes = ["/auth/login", "/auth/register"];
    const isAdminRoute = pathname.startsWith("/admin");

    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    if (authRoutes.includes(pathname)) {
      if (isLoggedIn) return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.next();
    }

    if (!isLoggedIn && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(
          `/auth/login?callbackUrl=${encodeURIComponent(req.url)}`,
          req.url,
        ),
      );
    }

    if (isAdminRoute && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
