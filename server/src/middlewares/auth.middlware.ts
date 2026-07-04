import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app.error.js";
import type { JwtPayload } from "../types/auth.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("Authorization header is missing", 401);
    }

    // const token = authHeader.split(" ")[1];
    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new AppError("Invalid token", 401);
    }
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw new AppError("Unauthorized", 401);
    }

    req.user = decoded as JwtPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;