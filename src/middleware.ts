import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = [
    "/login",
    "/register",
    "/landing",
    "/google-redirect",
  ].includes(pathname);
  const isProtected = !isAuthRoute;

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|img/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
  ],
};
