"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { createStoryAction } from "@/db/actions/stories";
import { useToast } from "./ui/use-toast";
import { useRef } from "react";
import { ToastAction } from "./ui/toast";

export function StoryForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(formData: FormData) {
    const result = await createStoryAction(formData);
    if (result.success) {
      toast({
        title: "New story!",
        description: `Created a new story title "${result.data.title}"`,
      });
      formRef.current?.reset();
    } else {
      toast({
        title: "Error creating story!",
        description: result.message,
        action: (
          <ToastAction
            altText="Clear form data"
            onClick={() => formRef.current?.reset()}
          >
            Clear form
          </ToastAction>
        ),
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-5/6 md:w-1/2"
      ref={formRef}
      action={onSubmit}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input required type="text" name="title" id="title" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="synopsis">Synopsis</Label>
        <Textarea name="synopsis" id="synopsis" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="body">Body</Label>
        <Textarea name="body" id="body" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input name="imageUrl" id="imageUrl" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="externalLink">External Link</Label>
        <Input name="externalLink" id="externalLink" />
      </div>
      <Separator />
      <SubmitButton value="Submit" loadingValue="Submitting..." />
    </form>
  );
}
