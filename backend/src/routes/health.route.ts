import { Router } from "express";
import { healthController } from "../controller";
import { catchAsync } from "../utils";

export const healthRouter: Router = Router();

healthRouter.get("/health", catchAsync(healthController.health));
