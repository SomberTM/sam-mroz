import { LoginButton } from "@/components/login-button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getCurrentUser();
  if (!!user) return redirect("/");

  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2">
      <LoginButton />
    </div>
  );
}
