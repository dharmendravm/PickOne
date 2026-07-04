import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error.js";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    throw new AppError("user not found", 400);
  }
  return user
};
