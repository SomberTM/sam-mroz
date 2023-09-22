"use server";

import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import db from "..";
import {
  AuthorProfile,
  Post,
  User,
  authorProfiles,
  posts,
  users,
} from "../schema";
import { desc, eq } from "drizzle-orm";
import { FormActionResponse } from ".";

function revalidatePostsRoutes() {
  revalidatePath("/");
  revalidatePath("/posts");
}

export async function createPostAction(
  formData: FormData,
): Promise<FormActionResponse<Post>> {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !content)
    return { success: false, message: "Missing title or content fields" };

  const user = await getCurrentUser();
  if (!user)
    return {
      success: false,
      message: "You must be logged in to create a post",
    };

  try {
    const [post] = await db
      .insert(posts)
      .values({
        title,
        content,
        authorId: user.id,
      })
      .returning();

    revalidatePostsRoutes();
    return { success: true, data: post };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export async function updatePostAction(
  formData: FormData,
): Promise<FormActionResponse<Post>> {
  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Need id to update post" };

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  try {
    const [post] = await db
      .update(posts)
      .set({
        title,
        content,
      })
      .where(eq(posts.id, id))
      .returning();

    revalidatePostsRoutes();
    return { success: true, data: post };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

const POSTS_PAGE_SIZE = 10;

interface PagedResult<T> {
  results: T[];
  hasNextPage: boolean;
}

/**
 * Get paged posts with 1 based page number
 * @param page
 */
export async function getPagedPosts(
  page: number,
): Promise<
  PagedResult<{ post: Post; user: User | null; profile: AuthorProfile | null }>
> {
  const results = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .offset(POSTS_PAGE_SIZE * (page - 1))
    // take page size + 1 as hack to check for next page
    .limit(POSTS_PAGE_SIZE + 1)
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(authorProfiles, eq(users.id, authorProfiles.userId));

  return {
    results: results.slice(0, POSTS_PAGE_SIZE),
    hasNextPage: results.length > POSTS_PAGE_SIZE,
  };
}
