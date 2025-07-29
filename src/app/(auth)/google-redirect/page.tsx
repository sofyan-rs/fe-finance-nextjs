"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";

export default function GoogleRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <CardContent>
      <p className="text-center">Logging in... Please wait</p>
    </CardContent>
  );
}
