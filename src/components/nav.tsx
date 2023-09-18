import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { NavList, NavMenu } from "./nav-menu";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export async function Nav() {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center justify-between h-20 border-b px-4 border-gray">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="block md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Sam Mroz</SheetTitle>
          </SheetHeader>
          <NavList role={user?.role} />
        </SheetContent>
      </Sheet>
      <NavMenu role={user?.role} />
      <div className="flex gap-4 items-center">
        {!!user && <LogoutButton />}
        {!user && <LoginButton />}
        <ThemeToggle />
      </div>
    </div>
  );
}
