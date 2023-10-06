"use server";

import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import db from "..";
import { Image, Story, stories } from "../schema";
import { FormActionResponse } from ".";
import { UploadFileResult, storyImageResizer, uploadImage } from "@/lib/s3";

export async function createStoryAction(
  formData: FormData,
): Promise<FormActionResponse<Story>> {
  const title = formData.get("title")?.toString();
  const body = formData.get("body")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const source = formData.get("source")?.toString();
  const sourceTitle = formData.get("sourceTitle")?.toString();
  const synopsis = formData.get("synopsis")?.toString();
  const image: File | undefined = formData.get("image")?.valueOf() as
    | File
    | undefined;
  const alt = formData.get("alt")?.toString();

  if (!title) return { success: false, message: `Missing story title` };
  if (!body) return { success: false, message: `Missing story body` };
  if (!!image && (!alt || alt === ""))
    return { success: false, message: `Alt text required for image` };

  const user = await getCurrentUser();
  if (!user) return { success: false, message: "You must be signed in" };

  try {
    let uploadResult: UploadFileResult<Image> | undefined;
    if (image && alt) {
      uploadResult = await uploadImage(image, alt, storyImageResizer);
      if (!uploadResult.success) return uploadResult;
    }

    const story = await db
      .insert(stories)
      .values({
        title,
        normalizedTitle: title,
        body,
        synopsis,
        imageUrl,
        source,
        sourceTitle,
        imageId:
          uploadResult && uploadResult.success
            ? uploadResult.data.id
            : undefined,
        authorId: user.id,
      })
      .returning();

    revalidatePath("/stories");
    return { success: true, data: story[0] };
  } catch (error: any) {
    return { success: false, message: (error as Error).message };
  }
}
