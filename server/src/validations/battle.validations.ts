import { z } from "zod";

export const createBattleSchema = z.object({
  title: z
    .string("Title is required.")
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(60, "Title must be less than 60 characters."),

  description: z
    .string("Description is required.")
    .trim()
    .min(20, "Description must be at least 20 characters long.")
    .max(1000, "Description must be less than 1000 characters."),

  expires_at: z.coerce
    .date({
      error: "Please provide a valid expiration date.",
    })
    .refine((date) => date > new Date(), {
      message: "Expiration date must be in the future.",
    }),
});

export type CreateBattleInput = z.infer<typeof createBattleSchema>;
