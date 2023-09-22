import { ActionButton } from "@/components/action-button";
import { Centered } from "@/components/centered";
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
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Setup your author profile!</h1>
        <ActionButton
          className="w-64"
          action={initializeProfile}
          toast={{
            title: "New author profile!",
            description:
              "You have successfully created your author profile. From here you can change the name that displays next to stories, posts, reviews, and more!",
            duration: 5000,
          }}
        >
          Click Here
        </ActionButton>
      </div>
    </Centered>
  );
}
