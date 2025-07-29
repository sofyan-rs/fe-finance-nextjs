import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "./navbar/logo";

const footerLinks = [
  {
    title: "Privacy Policy",
    href: "#privacy-policy",
  },
  {
    title: "Terms of Service",
    href: "#terms-of-service",
  },
];

const Footer = () => {
  return (
    <footer className="border-t mt-40 bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
          <div>
            <Logo />
            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-x-2 px-4 xl:px-0 text-sm">
          {/* Copyright */}
          <span className="text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              Okane - Money Tracker
            </Link>
            . All rights reserved.
          </span>

          <p className="text-muted-foreground">
            Created by{" "}
            <a className="font-medium" href="https://sofyan.id">
              Sofyan R
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
