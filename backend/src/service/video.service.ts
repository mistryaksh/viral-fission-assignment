import fs from "fs";
import { uploadToR2 } from "./r2.service";
import { Video } from "../model";

export const createVideo = async (
  file: Express.Multer.File,
  body: {
    title: string;
    description?: string;
    tags?: string;
  },
) => {
  const fileUrl = await uploadToR2(file.path, file.filename, file.mimetype);

  const video = await Video.create({
    title: body.title,
    description: body.description,
    tags: body.tags ? body.tags.split(",").map((tag) => tag.trim()) : [],
    videoUrl: fileUrl,
  });

  fs.unlinkSync(file.path);

  return video;
};
