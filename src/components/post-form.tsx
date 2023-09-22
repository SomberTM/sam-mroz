"use client";

import { createPostAction } from "@/db/actions/posts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { useRef } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import Link from "next/link";

export function PostForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(formData: FormData) {
    const result = await createPostAction(formData);
    if (result.success) {
      toast({
        title: "New post!",
        description: `Created a new post titled "${result.data.title}"`,
        action: (
          <ToastAction altText="Go to newly created story">
            <Link href={`/posts/1`}>Go to posts</Link>
          </ToastAction>
        ),
        duration: 5000,
      });
      formRef.current?.reset();
    } else {
      toast({
        title: "Error creating post!",
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
      action={onSubmit}
      ref={formRef}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input required type="text" name="title" id="title" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea required name="content" id="content" />
      </div>
      <Separator />
      <SubmitButton value="Post" loadingValue="Posting..." />
    </form>
  );
}
