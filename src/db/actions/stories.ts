"use server";

import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import db from "..";
import { Story, stories } from "../schema";
import { FormActionResponse } from ".";

export async function createStoryAction(
  formData: FormData,
): Promise<FormActionResponse<Story>> {
  console.log(formData);

  const title = formData.get("title")?.toString();
  const body = formData.get("body")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const source = formData.get("source")?.toString();
  const sourceTitle = formData.get("sourceTitle")?.toString();
  const synopsis = formData.get("synopsis")?.toString();

  if (!title) return { success: false, message: `Missing story title` };
  if (!body) return { success: false, message: `Missing story body` };

  const user = await getCurrentUser();
  if (!user) return { success: false, message: "You must be signed in" };

  try {
    const story = await db
      .insert(stories)
      .values({
        title,
        body,
        synopsis,
        imageUrl,
        source,
        sourceTitle,
        authorId: user.id,
      })
      .returning();

    revalidatePath("/stories");
    return { success: true, data: story[0] };
  } catch (error: any) {
    return { success: false, message: (error as Error).message };
  }
}
