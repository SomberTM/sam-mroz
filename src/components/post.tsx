"use client";

import { AuthorProfile, Post, User } from "@/db/schema";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "./ui/button";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updatePostAction } from "@/db/actions/posts";
import { useToast } from "./ui/use-toast";
import { RichTextEditor } from "./rich-text-editor";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export function Post({
  post,
  author,
  profile,
  canCurrentUserEdit = false,
  className,
}: {
  post: Post;
  author: User;
  profile: AuthorProfile | null;
  canCurrentUserEdit?: boolean;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const [content, setContent] = useState(post.content);

  const relative = dayjs().to(
    dayjs.utc(post.modifiedAt.toUTCString().substring(0, 23)).local(),
  );

  async function onSubmit(formData: FormData) {
    formData.set("id", post.id);
    formData.set("content", content);
    const result = await updatePostAction(formData);
    if (result.success) {
      toast({
        title: `Post edited!`,
        description: "Post successfully edited",
      });
      setIsEditing(false);
    } else {
      toast({
        title: "Error updating post",
        description: result.message,
      });
    }
  }

  const Container = canCurrentUserEdit ? "form" : React.Fragment;
  const containerProps = canCurrentUserEdit ? { action: onSubmit } : {};
  const hasBeenEdited =
    post.createdAt.getMilliseconds() !== post.modifiedAt.getMilliseconds();

  return (
    <Card className={cn("flex flex-col gap-1 p-4 relative", className)}>
      <Container {...containerProps}>
        <div className="flex justify-between items-center">
          <h1 className="flex items-center gap-1">
            {!isEditing && (
              <span className="font-bold text-lg">{post.title}</span>
            )}
            {isEditing && <Input name="title" defaultValue={post.title} />}
            <span className="text-muted-foreground">・</span>
            <span className="text-muted-foreground">
              {profile?.name ?? author.name}
            </span>
          </h1>
          <div className="flex gap-2">
            {canCurrentUserEdit && !isEditing && (
              <Button
                className="w-6 h-6 p-1"
                size="sm"
                variant="ghost"
                key="edit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                <PencilIcon />
              </Button>
            )}
            {canCurrentUserEdit && isEditing && (
              <Button
                className="w-6 h-6 p-1"
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                }}
              >
                <XIcon />
              </Button>
            )}
            {canCurrentUserEdit && isEditing && (
              <Button
                className="w-6 h-6 p-1"
                size="sm"
                type="submit"
                key="save"
                disabled={pending}
              >
                <CheckIcon />
              </Button>
            )}
          </div>
        </div>
        {!isEditing && (
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>
        )}
        {isEditing && (
          <RichTextEditor
            className="py-2"
            value={content}
            onChange={setContent}
          />
        )}
        <span className="text-muted-foreground text-sm">
          {hasBeenEdited && `Edited・`}
          {relative}
        </span>
      </Container>
    </Card>
  );
}
