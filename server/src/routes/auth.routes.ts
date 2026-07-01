import { Router } from "express";
import {
  loginController,
  registerController,
  verifyEmailController,
  verifyEmailErrorController,
} from "../controllers/auth.controller.js";

const router = Router();

// Login Route
router.post("/login", loginController);

// Register Route
router.post("/register", registerController);

// Email Verify Route
router.get("/verify-email", verifyEmailController);

// Email Verify Url Error Route
router.get("/verify-error", verifyEmailErrorController)

export default router;
