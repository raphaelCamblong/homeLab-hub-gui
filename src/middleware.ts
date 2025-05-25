import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/", "/auth/login"];
  const isPublicPath = publicPaths.includes(path);

  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/monitoring/:path*",
    "/service/:path*",
    "/notifications/:path*",
  ],
};
