import db from "@/db";
import { Image, images } from "@/db/schema";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import uuid from "uuid";

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

export interface ImageMeta {
  width: number;
  height: number;
  alt: string;
}

export interface ImageResizerResult {
  data: Buffer;
  mime: string;
  dimensions: ImageDimensions;
}

export interface ImageResizer {
  resize(buffer: Buffer): Promise<ImageResizerResult>;
}

const region = "us-east-2";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region,
});

export const storyImageResizer: ImageResizer = {
  async resize(buffer: Buffer) {
    const data = await sharp(buffer).resize(1200, 1000).webp().toBuffer();
    return {
      data,
      mime: "image/webp",
      dimensions: {
        width: 1200,
        height: 1000,
      },
    };
  },
};

export async function uploadImage(
  file: File,
  alt: string,
  resizer: ImageResizer,
): Promise<UploadFileResult<Image>> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const resized = await resizer.resize(buffer);

  const key = uuid.v4();
  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: resized.data,
    ContentType: resized.mime,
  };

  try {
    await client.send(new PutObjectCommand(params));

    const objectUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    const [image] = await db
      .insert(images)
      .values({
        bucket: params.Bucket!,
        fileName: key,
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
