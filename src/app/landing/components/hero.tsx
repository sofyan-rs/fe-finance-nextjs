"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SimpleTypewriter } from "@/components/ui/typewriter-effect";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <Badge className="bg-primary/10 text-primary rounded-full py-1 border border-primary/30">
            v1.0.0 is available now! 🚀
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold !leading-[1.2] tracking-tight flex items-center justify-center">
            <SimpleTypewriter
              text="Okane - Money Tracker"
              typeSpeed={100}
              showCursor={true}
            />
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Okane is a money tracker app that helps you track your income and
            expenses. It is a simple and easy to use app that allows you to
            track your income and expenses. Included with AI assistant to help
            you manage your money.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-lg text-base shadow-lg shadow-primary/30"
              >
                Get Started for Free <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Image
        src="/img/hero.png"
        alt="Okane"
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 sm:mt-12 rounded-xl border hover:animate-wobble transition-transform duration-300 hover:scale-105 cursor-pointer"
        onMouseEnter={(e) => {
          e.currentTarget.style.animation = "wobble 0.5s ease-in-out";
        }}
        width={500}
        height={500}
        priority
      />
    </div>
  );
};

export default Hero;
