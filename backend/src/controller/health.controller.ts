import { Request, Response } from "express";
import { Ok } from "../utils";

class HealthControllers {
  public health = async (req: Request, res: Response) => {
    return Ok(res, "Ok");
  };
}

export const healthController = new HealthControllers();
