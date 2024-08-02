// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// // import {withAuth} from "../next-fe/auth-util";

// const protectedRoutes = ["/todo"];

// export default function middleware(req: NextRequest) {
//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }