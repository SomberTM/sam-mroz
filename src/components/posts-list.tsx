import db from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card } from "./ui/card";

export async function PostsList() {
  const items = await db
    .select()
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));

  return (
    <ul className="flex flex-col justify-center gap-2 w-full">
      {items.map(({ user: author, posts: post }) => (
        <Card key={post.id} className="flex flex-col gap-1 p-4">
          <h1>
            {post.title} ・ {author!.name}
          </h1>
          <p>{post.content}</p>
          <span className="text-foreground text-sm">
            Posted: {post.createdAt.toISOString()}
          </span>
        </Card>
      ))}
    </ul>
  );
}
