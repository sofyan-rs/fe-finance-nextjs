import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-zinc-700/70 max-w-screen-xl mx-auto rounded-lg">
      <div className="h-full flex items-center justify-between mx-auto p-3">
        <Logo />
        {/* Desktop Menu */}
        {/* <NavMenu className="hidden md:block" /> */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          {/* Mobile Menu */}
          {/* <div className="md:hidden">
            <NavigationSheet />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
