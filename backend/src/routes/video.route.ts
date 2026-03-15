import { Router } from "express";
import { upload } from "../service";
import { videoController } from "../controller";
import {
  SelectVideoThumbnailValidatorRule,
  VideoValidatorRule,
} from "../validator";
import { Validate } from "../middleware";

export const videoRouter = Router();

videoRouter.post(
  "/",
  upload.single("video"),
  VideoValidatorRule,
  Validate,
  videoController.uploadVideo,
);
videoRouter.get("/", videoController.getVideo);
videoRouter.delete("/:id", videoController.deleteVideo);
videoRouter.get("/:id", videoController.getVideoById);
videoRouter.post(
  "/:id/thumbnails/generate",
  videoController.generateVideoThumbails,
);
videoRouter.post(
  "/:id/thumbnails/select",
  SelectVideoThumbnailValidatorRule,
  Validate,
  videoController.selectThumbnail,
);
