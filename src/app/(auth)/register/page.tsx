import { FormRegister } from "@/app/(auth)/components/form-register";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register - " + AppConfig.title,
};

export default function RegisterPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>
          <h1 className="text-lg font-semibold">Create an account</h1>
        </CardTitle>
        <CardDescription>
          Enter your email and password to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormRegister />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </CardContent>
    </>
  );
}
