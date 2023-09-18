import { AuthorProfile, Post, User } from "@/db/schema";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { Session } from "next-auth";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export function Post({
  post,
  author,
  profile,
  className,
}: {
  post: Post;
  author: User;
  profile: AuthorProfile | null;
  className?: string;
}) {
  const relative = dayjs().to(
    dayjs.utc(post.createdAt.toUTCString().substring(0, 23)).local(),
  );

  return (
    <Card className={cn("flex flex-col gap-1 p-4", className)}>
      <h1>
        <span className="font-bold">{post.title}</span>{" "}
        <span className="text-muted-foreground">・</span>{" "}
        <span className="text-muted-foreground">
          {profile?.name ?? author.name}
        </span>
      </h1>
      <p>{post.content}</p>
      <span className="text-muted-foreground text-sm">{relative}</span>
    </Card>
  );
}
