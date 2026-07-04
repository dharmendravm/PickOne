import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { apiRateLimiter, authRateLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.use("/auth", authRateLimiter, authRoutes);
router.use("/user",apiRateLimiter, userRoutes);

export default router;
