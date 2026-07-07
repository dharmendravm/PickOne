import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import useBattleRoutes from "./battle.routes.js";
import { authRateLimiter } from "../middlewares/rate-limit.middleware.js";
import authMiddleware from "../middlewares/auth.middlware.js";

const router = Router();

router.use("/auth", authRateLimiter, authRoutes);
router.use("/user", userRoutes);
router.use("/battle", authMiddleware, useBattleRoutes);

export default router;
