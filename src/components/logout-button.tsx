"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function LogoutButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Logout</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 flex flex-col gap-2 p-4">
        <h1 className="text-foreground text-xl font-bold">Are you sure?</h1>
        <div className="grid gap-2">
          <Button variant="destructive" onClick={() => signOut()}>
            Yes, logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
