import type { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";

import { registerSchema } from "../validations/auth.validations.js";
import prisma from "../config/database.js";
import { AppError } from "../utils/app.error.js";
import { renderEmailEjs } from "../utils/email.helper.js";
import { emailQueue, emailQueueName } from "../jobs/email.job.js";
import type {
  RegisterApiRequest,
  AuthApiResponse,
  LoginApiRequest,
} from "../types/auth.js";

export const loginController = async (
  req: Request<Record<string, never>, AuthApiResponse, LoginApiRequest>,
  res: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
};

export const registerController = async (
  req: Request<Record<string, never>, AuthApiResponse, RegisterApiRequest>,
  res: Response<AuthApiResponse>,
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
      expiresIn: "1hr",
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

    return res.json({
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
