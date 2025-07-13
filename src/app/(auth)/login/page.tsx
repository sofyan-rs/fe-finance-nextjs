import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FormLogin } from "@/app/(auth)/components/form-login";
import { Metadata } from "next";
import { AppConfig } from "@/config/app-config";

export const metadata: Metadata = {
  title: "Login - " + AppConfig.title,
};

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold">Login to your account</h2>
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </CardContent>
    </>
  );
}
