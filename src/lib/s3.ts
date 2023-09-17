import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

export interface UploadFileResultSuccess {
  success: true;
  location: string;
  key: string;
}

export interface UploadFileResultFailure {
  success: false;
  message: string;
}

export type UploadFileResult =
  | UploadFileResultSuccess
  | UploadFileResultFailure;

const region = "us-east-2";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region,
});

export async function uploadFile(file: File): Promise<UploadFileResult> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    await client.send(new PutObjectCommand(params));
    return {
      success: true,
      location: `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`,
      key: params.Key!,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
