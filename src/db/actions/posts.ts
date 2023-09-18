"use server";

import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import db from "..";
import { Post, User, posts, users } from "../schema";
import { desc, eq } from "drizzle-orm";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !content) return { status: 400 };

  const user = await getCurrentUser();
  if (!user) return { status: 400 };

  await db.insert(posts).values({
    title,
    content,
    authorId: user.id,
  });

  revalidatePath("/");
}

const POSTS_PAGE_SIZE = 10;

interface PagedResult<T> {
  results: T[];
  hasNextPage: boolean;
}

/**
 * Get paged posts with 0 based page number
 * @param page
 */
export async function getPagedPosts(
  page: number,
): Promise<PagedResult<{ posts: Post; user: User | null }>> {
  const results = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .offset(POSTS_PAGE_SIZE * page)
    // take page size + 1 as hack to check for next page
    .limit(POSTS_PAGE_SIZE + 1)
    .leftJoin(users, eq(posts.authorId, users.id));

  return {
    results: results.slice(0, POSTS_PAGE_SIZE),
    hasNextPage: results.length > POSTS_PAGE_SIZE,
  };
}
