import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { NavMenu } from "./nav-menu";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";

export async function Nav() {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center justify-between h-20 border-b px-4 border-gray">
      <NavMenu role={user?.role} />
      <div className="flex gap-4">
        {!!user && <LogoutButton />}
        {!user && <LoginButton />}
        <ThemeToggle />
      </div>
    </div>
  );
}
