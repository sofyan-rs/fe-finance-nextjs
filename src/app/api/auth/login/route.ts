import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiURL } from "@/config/base-url";
import { jwtDecode } from "jwt-decode";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const res = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
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

  return NextResponse.json({ success: true });
}
