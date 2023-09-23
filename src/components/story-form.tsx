"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { createStoryAction } from "@/db/actions/stories";
import { useToast } from "./ui/use-toast";
import { useRef, useState } from "react";
import { ToastAction } from "./ui/toast";
import Link from "next/link";
import { AttachImage } from "./attach-file";
import { Switch } from "./ui/switch";

const MAX_SYNOPSIS_CHARACTERS = 512;
const MAX_BODY_CHARACTERS = 8192;

export function StoryForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isImageLink, setIsImageLink] = useState(true);
  const [synopsisCharsRemaining, setSynopsisCharsRemaining] = useState(
    MAX_SYNOPSIS_CHARACTERS,
  );
  const [bodyCharsRemaining, setBodyCharsRemaining] =
    useState(MAX_BODY_CHARACTERS);

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
      <div className="relative flex flex-col gap-2">
        <Label htmlFor="synopsis">Synopsis</Label>
        <Textarea
          maxLength={MAX_SYNOPSIS_CHARACTERS}
          onChange={(event) =>
            setSynopsisCharsRemaining(
              MAX_SYNOPSIS_CHARACTERS - event.currentTarget.value.length,
            )
          }
          className="h-32"
          name="synopsis"
          id="synopsis"
        />
        <span className="absolute z-10 bottom-4 right-4 text-muted-foreground text-xs select-none">
          {synopsisCharsRemaining} characters remaining
        </span>
      </div>
      <Separator />
      <div className="relative flex flex-col gap-2">
        <Label htmlFor="body">Body</Label>
        <Textarea
          maxLength={MAX_BODY_CHARACTERS}
          onChange={(event) =>
            setBodyCharsRemaining(
              MAX_BODY_CHARACTERS - event.currentTarget.value.length,
            )
          }
          required
          className="h-64"
          name="body"
          id="body"
        />
        <span className="absolute z-10 bottom-4 right-4 text-muted-foreground text-xs select-none">
          {bodyCharsRemaining} characters remaining
        </span>
      </div>
      <Separator />
      <div className="flex flex-col gap-2"></div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="source">Source Link</Label>
        <Input
          placeholder="https://depauliaonline.com/65252/artslife/barbenheimer-a-pop-culture-boom-big-enough-to-reach-the-classroom/#photo"
          name="source"
          id="source"
        />
        <Label htmlFor="sourceTitle">Source Title</Label>
        <Input placeholder="The DePaulia" name="sourceTitle" id="sourceTitle" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Switch
          checked={isImageLink}
          onCheckedChange={() => setIsImageLink((value) => !value)}
        />
        {isImageLink && (
          <>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              placeholder="https://depauliaonline.com/wp-content/uploads/2023/09/Barbenheimer-1200x1000.jpg"
              name="imageUrl"
              id="imageUrl"
            />
          </>
        )}
        {!isImageLink && (
          <>
            <Label htmlFor="storyImage">Story Image</Label>
            <AttachImage name="image" id="storyImage" />
          </>
        )}
      </div>
      <Separator />
      <SubmitButton value="Submit" loadingValue="Submitting..." />
    </form>
  );
}
