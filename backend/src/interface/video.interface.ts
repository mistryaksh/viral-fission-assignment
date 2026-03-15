import mongoose from "mongoose";
import { IThumbnailProps } from "./thumbnail.interface";

export interface IVideoProps {
  title: string;
  description?: string;
  tags: string[];
  videoUrl: string;
  thumbnails: IThumbnailProps[];
}
