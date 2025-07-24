import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiURL } from "@/config/base-url";
import { jwtDecode } from "jwt-decode";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  const res = await fetch(`${apiURL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
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

  const response = NextResponse.json({ success: true });
  (await cookies()).set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: jwtDecode(token).exp,
  });

  return response;
}
