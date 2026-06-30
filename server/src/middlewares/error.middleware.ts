import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../utils/zod.helper.js";
import { AppError } from "../utils/app.error.js";

export const galobalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Handle Zod Validation Errors
  if (error instanceof ZodError) {
    const formattedErrors = formatZodError(error);
    return res.status(422).json({
      message: "Validation Error",
      errors: formattedErrors,
    });
  }
  // 2. Handle Custom App Errors (Jaise Email already exists, 401 Unauthorized, etc.)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    });
  }

  console.log("Server Error Logs", error);
  res.status(500).json({
    message: "Internal Server Error",
  });
};
