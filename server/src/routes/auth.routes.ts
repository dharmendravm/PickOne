import { Router } from "express";
import {
  checkCredentialsController,
  forgotPasswordController,
  registerController,
  resetPasswordController,
  verifyEmailController,
  verifyEmailErrorController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/check-credentials", checkCredentialsController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get("/verify-email", verifyEmailController);
router.get("/verify-error", verifyEmailErrorController);

export default router;
