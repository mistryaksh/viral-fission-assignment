import { body, ValidationChain } from "express-validator";

export const VideoValidatorRule: ValidationChain[] = [
  body("title").not().isEmpty().withMessage("title is required"),
  body("description").not().isEmpty().withMessage("description is required"),
  body("tags").not().isEmpty().withMessage("tags is required"),
];

export const SelectVideoThumbnailValidatorRule: ValidationChain[] = [
  body("thumbnailUrl").not().isEmpty().withMessage("thumbnail URL is required"),
];
