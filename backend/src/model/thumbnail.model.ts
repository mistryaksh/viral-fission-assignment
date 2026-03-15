import mongoose from "mongoose";
import { IThumbnailProps } from "../interface";

export const thumbnailSchema = new mongoose.Schema<IThumbnailProps>(
  {
    url: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);
