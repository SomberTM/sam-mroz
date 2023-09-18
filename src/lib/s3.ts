import db from "@/db";
import { images } from "@/db/schema";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

export interface UploadFileResultSuccess {
  success: true;
  url: string;
  key: string;
}

export interface UploadFileResultFailure {
  success: false;
  message: string;
}

export type UploadFileResult =
  | UploadFileResultSuccess
  | UploadFileResultFailure;

export interface ImageMeta {
  width: number;
  height: number;
  alt: string;
}

const region = "us-east-2";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region,
});

export async function uploadImage(
  file: File,
  meta: ImageMeta,
): Promise<UploadFileResult> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read-write",
  };

  try {
    await client.send(new PutObjectCommand(params));

    const objectUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    await db.insert(images).values({
      bucket: params.Bucket!,
      fileName: file.name,
      url: objectUrl,
      width: meta.width,
      height: meta.height,
      alt: meta.alt,
    });

    return {
      success: true,
      url: objectUrl,
      key: params.Key!,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
