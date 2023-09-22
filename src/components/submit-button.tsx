"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({
  value,
  loadingValue,
  isLoading = undefined,
}: {
  value: React.ReactNode;
  loadingValue: React.ReactNode;
  isLoading?: boolean;
}) {
  const { pending } = useFormStatus();
  const loading = isLoading !== undefined ? isLoading : pending;

  return <Button disabled={loading}>{pending ? loadingValue : value}</Button>;
}
