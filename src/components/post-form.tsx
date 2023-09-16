import { createPostAction } from "@/db/actions/posts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";

export function PostForm() {
  return (
    <form
      className="flex flex-col gap-4 w-5/6 md:w-1/2"
      action={createPostAction}
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
