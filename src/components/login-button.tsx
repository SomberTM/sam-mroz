"use client";

import { LiteralUnion, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { BuiltInProviderType } from "@auth/core/providers";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface Provider {
  provider: LiteralUnion<BuiltInProviderType>;
  title: string;
}

export function LoginButton({ providers }: { providers: Provider[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Login</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold text-foreground">Login with</h1>
        <ul className="flex flex-col gap-2 w-full">
          {providers.map(({ provider, title }, idx) => (
            <>
              <Button
                className="self-center w-32"
                key={title}
                onClick={() => signIn(provider)}
              >
                {title}
              </Button>
              {idx !== providers.length - 1 && (
                <Separator key={`separator-${idx}`} />
              )}
            </>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
