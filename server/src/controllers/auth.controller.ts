import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/auth.validations.js";
import prisma from "../config/database.js";
import { AppError } from "../utils/app.error.js";
import { renderEmailEjs } from "../utils/email.helper.js";
import { emailQueue, emailQueueName } from "../jobs/email.job.js";
import type {
  RegisterApiRequest,
  RegisterApiResponse,
  LoginApiRequest,
  LoginApiResponse,
  JwtPayload,
} from "../types/auth.types.js";
import jwt from "jsonwebtoken";
import { checkHourDateDiff } from "../utils/check-hour-date.js";

export const registerController = async (
  req: Request<Record<string, never>, RegisterApiResponse, RegisterApiRequest>,
  res: Response<RegisterApiResponse>,
  next: NextFunction,
) => {
  try {
    const payload = registerSchema.parse(req.body);

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user) {
      throw new AppError("User with this email already exists", 422);
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const token = await bcrypt.hash(uuid4(), salt);

    const params = new URLSearchParams({
      email: payload.email,
      token,
    });

    const url = `${process.env.APP_URL}/api/auth/verify-email?${params}`;

    const emailBody = await renderEmailEjs("verify-email.ejs", {
      name: payload.name,
      verificationUrl: url,
    });

    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Complete your email verification",
      body: emailBody,
    });

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message:
        "Registration successful! Please check your email to verify your account before signing in.",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, token } = req.query;

  if (email && token) {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (user) {
      if (token === user.email_verify_token) {
        await prisma.user.update({
          data: {
            email_verify_token: null,
            email_verified_at: new Date().toISOString(),
          },
          where: {
            email: email as string,
          },
        });

        res.redirect(`${process.env.CLIENT_APP_URL}/login`);
      }
    }
    return res.redirect("/verify-error");
  }

  return res.redirect("/verify-error");
};

export const verifyEmailErrorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.render("auth/email-verification-error");
};

export const checkCredentialsController = async (
  req: Request<Record<string, never>, LoginApiResponse, LoginApiRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 400);
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      user.password!,
    );

    if (!isPasswordMatch) {
      throw new AppError("Invalid email or password", 400);
    }
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });
    return res.status(200).json({
      statusCode: 200,
      message: "Logged in successfully",
      data: {
        email: user.email,
        token: `Bearer ${token}`
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const payload = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new AppError("Invalid data", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const token = await bcrypt.hash(uuid4(), salt);

    await prisma.user.update({
      data: {
        password_reset_token: token,
        password_reset_send_at: new Date().toISOString(),
      },
      where: {
        email: payload.email,
      },
    });

    const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;
    const emailBody = await renderEmailEjs("forgot-password.ejs", {
      resetUrl: url,
    });

    await emailQueue.add(emailQueueName, {
      to: user.email,
      subject: "Reset your password",
      body: emailBody,
    });

    return res.status(200).json({
      statusCode: 200,
      message:
        "If that email address is in our system, we have sent a password reset link to it.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const payload = resetPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new AppError(
        "Invalid verification link, Please make sure you copied the correct link.",
        400,
      );
    }

    if (user.password_reset_token !== payload.token) {
      throw new AppError(
        "Invalid verification Token, Please make sure you copied the correct link.",
        400,
      );
    }

    // Check token 2 hours timeframe
    const houresDifference = checkHourDateDiff(user.password_reset_send_at);

    if (houresDifference > 2) {
      throw new AppError("Password reset token expired!", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(payload.password, salt);

    await prisma.user.update({
      data: {
        password: newPassword,
        password_reset_token: null,
        password_reset_send_at: null,
      },
      where: {
        email: payload.email,
      },
    });

    res.status(200).json({
      statusCode: 200,
      message: "password reset successfully. Please try to login now!",
    });
  } catch (error) {
    next(error);
  }
};
