import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequest } from "../utils";

export const multerErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds limit",
      });
    }
  }

  if (error.message === "Only video files allowed") {
    return BadRequest(res, error.message);
  }

  next(error);
};
