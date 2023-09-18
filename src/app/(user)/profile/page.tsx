import { AuthorProfileForm } from "@/components/author-profile-form";
import { Centered } from "@/components/centered";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  if (user.profile === null) return redirect("/profile/create");

  return (
    <Centered>
      <AuthorProfileForm profile={user.profile} />
    </Centered>
  );
}
