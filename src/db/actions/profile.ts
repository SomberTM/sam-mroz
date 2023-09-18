"use server";

import { eq } from "drizzle-orm";
import db from "..";
import { AuthorProfile, authorProfiles, users } from "../schema";
import { FormActionResponse } from ".";
import { revalidatePath } from "next/cache";

export async function getAuthorProfile(
  userId: string,
): Promise<AuthorProfile | undefined> {
  const [profile] = await db
    .select()
    .from(authorProfiles)
    .where(eq(authorProfiles.userId, userId));

  return profile;
}

export async function initializeAuthorProfile(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  const [profile] = await db
    .insert(authorProfiles)
    .values({
      userId,
      name: user.name ?? "",
    })
    .returning();

  return profile;
}

export async function updateAuthorProfile(
  formData: FormData,
): Promise<FormActionResponse<AuthorProfile>> {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  if (!name || !id)
    return { success: false, message: "Missing 'name' or 'id' fields" };

  const [profile] = await db
    .update(authorProfiles)
    .set({
      name,
    })
    .where(eq(authorProfiles.id, id))
    .returning();

  revalidatePath("/profile");

  return {
    success: true,
    data: profile,
  };
}
