import axios from "axios";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { uploadToR2 } from "./r2.service";
import { Video } from "../model";

ffmpeg.setFfmpegPath(ffmpegPath!);

export const generateThumbnails = async (videoId: string) => {
  const video = await Video.findById(videoId);

  if (!video) {
    throw new Error("Video not found");
  }

  const tempDir = path.join(__dirname, "../temp");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const localVideoPath = path.join(tempDir, `${videoId}.mp4`);

  const response = await axios({
    url: video.videoUrl,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(localVideoPath);

  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const thumbnails: any[] = [];

  await new Promise((resolve, reject) => {
    ffmpeg(localVideoPath)
      .screenshots({
        timestamps: ["3", "5", "8"],
        filename: `thumb-%i-${videoId}.png`,
        folder: tempDir,
      })
      .on("end", resolve)
      .on("error", reject);
  });

  const files = fs
    .readdirSync(tempDir)
    .filter((file) => file.includes(`thumb-`) && file.includes(videoId));

  for (const file of files) {
    const filePath = path.join(tempDir, file);

    const url = await uploadToR2(filePath, file, "image/png");

    thumbnails.push({
      url,
      score: Math.floor(Math.random() * 15) + 80,
      isPrimary: false,
    });

    fs.unlinkSync(filePath);
  }

  fs.unlinkSync(localVideoPath);

  thumbnails.sort((a, b) => b.score - a.score);

  if (thumbnails.length > 0) {
    thumbnails[0].isPrimary = true;
  }

  video.thumbnails = thumbnails;

  await video.save();

  return thumbnails;
};
