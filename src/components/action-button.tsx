"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Toast, useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

export function ActionButton({
  action,
  children,
  toast: toastProps = undefined,
  ...props
}: {
  action: () => void | Promise<void>;
  children: React.ReactNode;
  toast?: Toast;
} & React.ComponentProps<typeof Button>) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  return (
    <>
      {toastProps && <Toaster />}
      <Button
        {...props}
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await action();
          setIsLoading(false);
          if (toastProps) toast(toastProps);
        }}
      >
        {children}
      </Button>
    </>
  );
}
