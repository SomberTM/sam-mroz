import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import db from "..";
import { posts } from "../schema";

export async function createPostAction(formData: FormData) {
  "use server";

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
