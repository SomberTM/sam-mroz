import db from "@/db";
import { Image, images } from "@/db/schema";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp, { Sharp } from "sharp";
import * as uuid from "uuid";

export interface UploadFileResultSuccess<T> {
  success: true;
  data: T;
}

export interface UploadFileResultFailure {
  success: false;
  message: string;
}

export type UploadFileResult<T = unknown> =
  | UploadFileResultSuccess<T>
  | UploadFileResultFailure;

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageResizerResult {
  data: Sharp;
  dimensions: ImageDimensions;
}

export interface ImageResizer {
  resize(buffer: Buffer | ArrayBuffer): ImageResizerResult;
}

const region = "us-east-2";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region,
});

export const fourThreeAspectResizer: ImageResizer = {
  resize(buffer: Buffer | ArrayBuffer) {
    const data = sharp(buffer).resize(800, 600);
    return {
      data,
      dimensions: {
        width: 800,
        height: 600,
      },
    };
  },
};

export async function uploadImage(
  file: File,
  alt: string,
  resizer: ImageResizer = fourThreeAspectResizer,
): Promise<UploadFileResult<Image>> {
  const resized = resizer.resize(await file.arrayBuffer());
  const webp = await resized.data.webp().toBuffer();

  const key = uuid.v4();
  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${key}.webp`,
    Body: webp,
    ContentType: "image/webp",
    ACL: "public-read-write",
  };

  try {
    await client.send(new PutObjectCommand(params));

    const objectUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    const [image] = await db
      .insert(images)
      .values({
        bucket: params.Bucket!,
        fileName: params.Key!,
        url: objectUrl,
        width: resized.dimensions.width,
        height: resized.dimensions.height,
        alt,
      })
      .returning();

    return {
      success: true,
      data: image,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
