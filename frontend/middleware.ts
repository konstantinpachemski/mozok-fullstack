// middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const unprotectedRoutes = ["/auth/signup", "/auth/signin"];
  const { pathname, origin } = request.nextUrl;

  // Check if the request is to an unprotected route
  if (unprotectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If the token exists, allow the request
  if (token) {
    return NextResponse.next();
  }

  // Redirect to the login page if the token is not present
  return NextResponse.redirect(`${origin}/auth/signin`);

  // const path = request.nextUrl.pathname;

  // // Define which paths are considered public (not protected)
  // const publicPaths = ["/", "/auth/signin", "/auth/signup"];
  // const isPublicPath = publicPaths.includes(path);

  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // // Redirect to signin if accessing a protected route without authentication
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // }

  // // Redirect to dashboard if accessing signin/signup while authenticated
  // if (token) {
  //   if (path === "/auth/signin" || path === "/auth/signup") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
