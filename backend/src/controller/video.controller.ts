import { Request, Response } from "express";
import { Ok, BadRequest, InternalServerError, NotFound } from "../utils";
import { createVideo, deleteFromR2 } from "../service";
import { Video } from "../model";
import { generateThumbnails } from "../service/thumbnail.service";

class VideoController {
  public uploadVideo = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return BadRequest(res, "Video file required");
      }

      const video = await createVideo(req.file, req.body);

      if (video._id) {
        return Ok(res, {
          message: "Video uploaded successfully",
          video,
        });
      } else {
        return BadRequest(res, "Something went wrong");
      }
    } catch (err) {
      return InternalServerError(res, err);
    }
  };

  public getVideo = async (req: Request, res: Response) => {
    try {
      const { search = "", tag = "", page = "1", limit = "10" } = req.query;

      const query: any = {};

      if (search) {
        query.title = {
          $regex: search,
          $options: "i",
        };
      }

      if (tag) {
        query.tags = tag;
      }

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const skip = (pageNumber - 1) * limitNumber;

      const [videos, total] = await Promise.all([
        Video.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNumber),

        Video.countDocuments(query),
      ]);

      return Ok(res, {
        videos,
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber),
          hasNext: pageNumber < Math.ceil(total / limitNumber),
          hasPrev: pageNumber > 1,
        },
      });
    } catch (err) {
      return InternalServerError(res, err);
    }
  };

  public getVideoById = async (req: Request, res: Response) => {
    try {
      const video = await Video.findById(req.params.id);
      return Ok(res, video);
    } catch (err) {
      return InternalServerError(res, err);
    }
  };

  public generateVideoThumbails = async (req: Request, res: Response) => {
    try {
      const videoId: string = req.params.id as string;
      const video = await Video.findById(videoId);
      if (!video) {
        return NotFound(res, "Video not found");
      } else {
        const thumbnails = await generateThumbnails(videoId);
        return Ok(res, thumbnails);
      }
    } catch (err) {
      return InternalServerError(res, err);
    }
  };

  public selectThumbnail = async (req: Request, res: Response) => {
    try {
      const video = await Video.findById(req.params.id);

      if (!video) {
        return NotFound(res, "Video not found");
      }

      const { thumbnailUrl } = req.body;

      video.thumbnails = video.thumbnails.map((thumb: any) => ({
        ...thumb,
        isPrimary: thumb.url === thumbnailUrl,
      })) as any;

      await video.save();

      return Ok(res, {
        message: "Thumbnail is set as primary",
        thumbs: video.thumbnails,
      });
    } catch (err) {
      return InternalServerError(res, err);
    }
  };

  public deleteVideo = async (req: Request, res: Response) => {
    try {
      const videoId = req.params.id as string;

      const video = await Video.findById(videoId);

      if (!video) {
        return NotFound(res, "Video not found");
      }

      await Promise.all(
        video.thumbnails.map((thumbnail) => deleteFromR2(thumbnail.url)),
      );

      await deleteFromR2(video.videoUrl);

      await Video.findByIdAndDelete(videoId);

      return Ok(res, "Video deleted successfully");
    } catch (err) {
      return InternalServerError(res, err);
    }
  };
}

export const videoController = new VideoController();
