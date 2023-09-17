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
import { Toaster } from "./ui/toaster";
import Link from "next/link";
import { AttachImage } from "./attach-file";

export function StoryForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(formData: FormData) {
    const result = await createStoryAction(formData);
    if (result.success) {
      toast({
        title: "New story!",
        description: `Created a new story titled "${result.data.title}"`,
        action: (
          <ToastAction altText="Go to newly created story">
            <Link href={`/stories/${result.data.title}`}>Go to story</Link>
          </ToastAction>
        ),
        duration: 5000,
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
        duration: 5000,
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-5/6 md:w-1/2"
      ref={formRef}
      action={onSubmit}
    >
      <Toaster />
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          required
          placeholder='"Barbenheimer:" A pop culture boom big enough to reach the classroom'
          type="text"
          name="title"
          id="title"
        />
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
        <Input
          placeholder="https://depauliaonline.com/wp-content/uploads/2023/09/Barbenheimer-1200x1000.jpg"
          name="imageUrl"
          id="imageUrl"
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="source">Source Link</Label>
        <Input
          placeholder="https://depauliaonline.com/65252/artslife/barbenheimer-a-pop-culture-boom-big-enough-to-reach-the-classroom/#photo"
          name="source"
          id="source"
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="sourceTitle">Source Title</Label>
        <Input placeholder="The DePaulia" name="sourceTitle" id="sourceTitle" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="storyImage">Story Image</Label>
        <AttachImage name="image" id="storyImage" />
      </div>
      <Separator />
      <SubmitButton value="Submit" loadingValue="Submitting..." />
    </form>
  );
}
