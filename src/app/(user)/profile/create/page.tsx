import { ActionButton } from "@/components/action-button";
import { Centered } from "@/components/centered";
import { Button } from "@/components/ui/button";
import { initializeAuthorProfile } from "@/db/actions/profile";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  if (!!user.profile) return redirect("/profile");

  async function initializeProfile() {
    "use server";
    if (!user) return;
    await initializeAuthorProfile(user.id);
    redirect("/profile");
  }

  return (
    <Centered>
      <ActionButton action={initializeProfile}>Initialize Profile</ActionButton>
    </Centered>
  );
}
