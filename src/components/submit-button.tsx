"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";

export function SubmitButton({
  value,
  loadingValue,
}: {
  value: string;
  loadingValue: string;
}) {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? loadingValue : value}</Button>;
}
