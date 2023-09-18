import db from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Post } from "./post";

export async function PostsList() {
  const items = await db
    .select()
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));

  return (
    <ul className="flex flex-col justify-center gap-2 w-full">
      {items.map(({ user: author, posts: post }) => (
        <Post key={post.id} post={post} author={author!} />
      ))}
    </ul>
  );
}
