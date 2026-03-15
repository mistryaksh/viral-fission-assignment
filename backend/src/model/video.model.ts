import mongoose from "mongoose";
import { IVideoProps } from "../interface";
import { thumbnailSchema } from "./thumbnail.model";

const videoSchema = new mongoose.Schema<IVideoProps>(
  {
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnails: [thumbnailSchema],
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Video = mongoose.model<IVideoProps>("Video", videoSchema);
