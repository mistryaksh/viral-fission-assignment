import { NextFunction, Request, RequestHandler, Response } from "express";
import { RESPONSE_MESSAGE, STATUS_CODES } from "../interface";

export const Ok = <T>(res: Response, data: T) => {
  res.status(STATUS_CODES.OK).json({
    success: true,
    data,
    status_code: RESPONSE_MESSAGE.OK,
  });
};

export const InternalServerError = (res: Response, error: unknown) => {
  console.log("====================================");
  console.log("SERVER ERROR", error);
  console.log("====================================");
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    status_code: STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });
};

export const Created = <T>(res: Response, data: T) => {
  res.status(STATUS_CODES.CREATED).json({
    success: true,
    data,
    status_code: RESPONSE_MESSAGE.CREATED,
  });
};

export const NoContent = (res: Response) => {
  res.status(STATUS_CODES.NO_CONTENT).json({
    success: true,
    status_code: STATUS_CODES.NO_CONTENT,
  });
};

export const BadRequest = (res: Response, message: any) => {
  res.status(STATUS_CODES.BAD_REQUEST).json({
    success: false,
    status_code: STATUS_CODES.BAD_REQUEST,
    message,
  });
};

export const NotFound = (res: Response, message: string) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    success: false,
    status_code: STATUS_CODES.NOT_FOUND,
    message,
  });
};

export const UnAuthorized = (res: Response, message: string) => {
  res.status(STATUS_CODES.UNAUTHORIZED).json({
    success: false,
    status_code: STATUS_CODES.UNAUTHORIZED,
    message,
  });
};

export const Forbidden = (res: Response, message: string) => {
  res.status(STATUS_CODES.FORBIDDEN).json({
    success: false,
    status_code: STATUS_CODES.FORBIDDEN,
    message,
  });
};

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
