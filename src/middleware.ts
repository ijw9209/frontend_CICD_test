import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;

  if (!(request.nextUrl.pathname === "/login")) {
    if (!accessToken) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files (e.g. .ico, .jpg, .png, .css, .js)
     */
    "/((?!api|_next|.*\\..*).*)",
  ],
};
