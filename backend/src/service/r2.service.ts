import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { config } from "../config";

const r2 = new S3Client({
  region: "auto",
  endpoint: config.R2_ENDPOINT,
  credentials: {
    accessKeyId: config.R2_ACCESS_KEY,
    secretAccessKey: config.R2_SECRET_KEY,
  },
  forcePathStyle: true,
});

export const uploadToR2 = async (
  filePath: string,
  fileName: string,
  mimeType: string,
) => {
  const fileBuffer = fs.readFileSync(filePath);

  await r2.send(
    new PutObjectCommand({
      Bucket: config.R2_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    }),
  );

  return `${config.R2_PUBLIC_URL}/${fileName}`;
};

export const deleteFromR2 = async (key: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    await r2.send(command);

    return {
      success: true,
      message: "Object deleted successfully",
    };
  } catch (error) {
    console.error("R2 Delete Error:", error);

    return {
      success: false,
      message: "Failed to delete object",
    };
  }
};
