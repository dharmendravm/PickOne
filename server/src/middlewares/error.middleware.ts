import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { formatZodError } from "../utils/zod.helper.js";
import { AppError } from "../utils/app.error.js";
import type { ErrorResponse } from "../types/api.js";

export const galobalErrorHandler = (
  error: any,
  req: Request,
  res: Response<ErrorResponse>,
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
  // 3. Handle Multer upload limits before falling back to a 500 response.
  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Image must be 4 MB or smaller."
        : "Unable to upload the image.";

    return res.status(400).json({ message });
  }

  // Unexpected errors are logged on the server only.
  console.log("Server Error Logs", error);
  res.status(500).json({
    message: "Internal Server Error",
  });
};
