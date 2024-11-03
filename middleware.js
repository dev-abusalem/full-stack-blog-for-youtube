import { NextResponse } from "next/server";
import { decodeToken } from "./app/(server)/token/decodeToken";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  let auth = null;
  if (token) {
    auth = decodeToken(token);
  }
  if (auth && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!auth && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
