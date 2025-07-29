import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "./animated-grid-pattern";
import { AppConfig } from "@/config/app-config";
import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="px-6">
      <div className="border relative overflow-hidden my-20 w-full dark:bg-background text-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-0 h-[200%] skew-y-12"
          )}
        />
        <div className="relative z-0 flex flex-col gap-3">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Ready to manage your finances?
          </h3>
          <p className="mt-2 text-base">
            Sign up today and start managing your money with{" "}
            <span className="font-bold">{AppConfig.title}</span>
          </p>
        </div>
        <div className="relative z-0 mt-14 flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button size="lg">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
