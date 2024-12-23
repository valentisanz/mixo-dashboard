import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const isAuthRoute = req.nextUrl.pathname === "/";
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if (isAuthRoute && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isProtectedRoute && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
