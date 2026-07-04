import { JwtPayload } from "./types/auth.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
