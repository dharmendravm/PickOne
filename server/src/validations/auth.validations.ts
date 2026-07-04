import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string("Password is required."),
});

export const registerSchema = z
  .object({
    name: z
      .string("Name is required.")
      .min(3, "Name must be 3 characters long."),

    email: z.email("Please enter a valid email address."),

    password: z
      .string("Password is required.")
      .min(6, "Password must be at least 6 characters long."),

    confirm_password: z
      .string("Confirm Password is required.")
      .min(6, "Password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm Password is not matched",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    token: z.string("Token is required."),
    password: z
      .string("Password is required.")
      .min(6, "Password must be at least 6 characters long."),

    confirm_password: z
      .string("Confirm Password is required.")
      .min(6, "Password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm Password is not matched",
    path: ["confirm_password"],
  });
