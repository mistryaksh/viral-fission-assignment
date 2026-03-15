import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "../utils";

export const Validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => {
      return `${capitalizeFirstLetter(err.msg)}`;
    });
    return BadRequest(
      res,
      formattedErrors.map((err) => {
        return {
          message: err,
        };
      }),
    );
  }

  next();
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
