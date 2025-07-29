import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiURL } from "@/config/base-url";
import { jwtDecode } from "jwt-decode";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing code in request" },
      { status: 400 }
    );
  }

  const res = await fetch(`${apiURL}/auth/google/callback?code=${code}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let payload;
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    payload = await res.json();
  } else {
    payload = { error: await res.text() };
  }

  if (!res.ok) {
    return NextResponse.json(payload, { status: res.status });
  }

  const token = payload.data.token;
  if (!token) {
    return NextResponse.json(
      { error: "Missing token in response" },
      { status: 500 }
    );
  }

  const decoded = jwtDecode<{ exp: number }>(token);
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  (await cookies()).set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: expiresIn,
  });

  return NextResponse.redirect(new URL("/google-redirect", request.url));
}
