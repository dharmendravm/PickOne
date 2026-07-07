import { Router } from "express";
import {
  createBattleController,
  getUserBattelsController,
  getBattelByIdController,
  updateBattleController,
  deleteBattleController,
} from "../controllers/battle.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getUserBattelsController);

router.get("/:id", getBattelByIdController);

router.post("/", upload.single("image"), createBattleController);

router.patch("/:id", upload.single("image"), updateBattleController);

router.delete("/:id", deleteBattleController);

export default router;
