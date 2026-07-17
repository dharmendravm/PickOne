import type { Request, Response, NextFunction } from "express";
import { createBattleSchema } from "../validations/battle.validations.js";
import type {
  CreateBattleApiRequest,
  CreateBattleApiResponse,
} from "../types/battle.types.js";
import { AppError } from "../utils/app.error.js";
import {
  deleteImage,
  uploadImage,
} from "../services/cloudinary.service.js";
import prisma from "../config/database.js";


export const createBattleController = async (
  req: Request<
    Record<string, never>,
    CreateBattleApiResponse,
    CreateBattleApiRequest
  >,
  res: Response<CreateBattleApiResponse>,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const body = req.body;
    const payload = createBattleSchema.parse(body);

    if (!req.file) {
      throw new AppError("Image is required", 400);
    }

    const uploadedImage = await uploadImage(req.file);

    const battle = await prisma.battle.create({
      data: {
        title: payload.title,
        description: payload.description,
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id,
        expires_at: payload.expires_at,
        user_id: req.user.id,
      },
    });

    return res.json({
      statusCode: 201,
      message: "Battle created successfully",
      data: {
        id: battle.id,
        title: battle.title,
        description: battle.description,
        image: battle.image,
        created_at: battle.created_at,
        expires_at: battle.expires_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBattelsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const battles = await prisma.battle.findMany({
      where: {
        user_id: req.user.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Battles fetched successfully",
      data: {
        battles,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBattelByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const battle = await prisma.battle.findUnique({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "battele fetched successfully",
      data: {
        battle,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBattleController = async (
  req: Request<
    { id: string },
    CreateBattleApiResponse,
    CreateBattleApiRequest
  >,
  res: Response<CreateBattleApiResponse>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const battleId = Number(id);
    if (!Number.isInteger(battleId) || battleId <= 0) {
      throw new AppError("Invalid battle id", 400);
    }

    const existingBattle = await prisma.battle.findFirst({
      where: {
        id: battleId,
        user_id: req.user.id,
      },
    });

    if (!existingBattle) {
      throw new AppError("Battle not found", 404);
    }

    const payload = createBattleSchema.parse(req.body);
    const uploadedImage = req.file ? await uploadImage(req.file) : null;

    let battle;
    try {
      battle = await prisma.battle.update({
        where: { id: existingBattle.id },
        data: {
          title: payload.title,
          description: payload.description,
          expires_at: payload.expires_at,
          ...(uploadedImage && {
            image: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
          }),
        },
      });
    } catch (error) {
      if (uploadedImage) {
        await deleteImage(uploadedImage.public_id).catch(() => undefined);
      }
      throw error;
    }

    if (uploadedImage) {
      await deleteImage(existingBattle.imagePublicId).catch(() => undefined);
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Battle updated successfully",
      data: {
        id: battle.id,
        title: battle.title,
        description: battle.description,
        image: battle.image,
        created_at: battle.created_at,
        expires_at: battle.expires_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBattleController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const battleId = Number(req.params.id);
    if (!Number.isInteger(battleId) || battleId <= 0) {
      throw new AppError("Invalid battle id", 400);
    }

    const battle = await prisma.battle.findFirst({
      where: {
        id: battleId,
        user_id: req.user.id,
      },
    });

    if (!battle) {
      throw new AppError("Battle not found", 404);
    }

    await prisma.battle.delete({
      where: { id: battle.id },
    });

    await deleteImage(battle.imagePublicId).catch((error) => {
      console.error("Failed to delete battle image from Cloudinary", error);
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Battle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
