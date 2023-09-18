"use client";

import { Button } from "./ui/button";

export function ActionButton({
  action,
  children,
}: {
  action: () => void | Promise<void>;
  children: React.ReactNode;
}) {
  return <Button onClick={() => action()}>{children}</Button>;
}
