import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="mx-2">
          <NavMenu orientation="vertical" />
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full sm:hidden">
            Sign In
          </Button>
          <Button className="w-full xs:hidden">Register</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
