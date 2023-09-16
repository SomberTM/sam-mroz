"use client";

import { LiteralUnion, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { BuiltInProviderType } from "@auth/core/providers";

interface Provider {
  provider: LiteralUnion<BuiltInProviderType>;
  title: string;
}

const providers: Provider[] = [
  { provider: "discord", title: "Discord" },
  { provider: "github", title: "GitHub" },
];

export function LoginButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Login</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold text-foreground">Login with</h1>
        <ul className="flex flex-col gap-2 w-full">
          {providers.map(({ provider, title }, idx) => (
            <li className="flex flex-col gap-2" key={title}>
              <Button
                className="self-center w-32"
                onClick={() => signIn(provider)}
              >
                {title}
              </Button>
              {idx !== providers.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
