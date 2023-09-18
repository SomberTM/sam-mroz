"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { SubmitButton } from "./submit-button";
import { useRef } from "react";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { AuthorProfile } from "@/db/schema";
import { updateAuthorProfile } from "@/db/actions/profile";

export function AuthorProfileForm({ profile }: { profile: AuthorProfile }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(formData: FormData) {
    formData.set("id", profile.id);
    formData.set("userId", profile.userId);
    const result = await updateAuthorProfile(formData);
    if (result.success) {
      toast({
        title: "Update profile!",
        description: `Update profile name to "${result.data.name}"`,
        duration: 5000,
      });
      formRef.current?.reset();
    } else {
      toast({
        title: "Error updateing profile!",
        description: result.message,
        duration: 5000,
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-5/6 md:w-1/2"
      action={onSubmit}
      ref={formRef}
    >
      <Toaster />
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          defaultValue={profile.name}
          required
          type="text"
          name="name"
          id="name"
        />
      </div>
      <Separator />
      <SubmitButton value="Update" loadingValue="Updating..." />
    </form>
  );
}
