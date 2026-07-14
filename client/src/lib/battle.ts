import axios from "axios";

import { BATTLE_URL } from "@/lib/api-endpoints";

export type BattleFormValues = {
  title: string;
  description: string;
  image: File | null;
  expiresAt?: Date;
};

export type BattleFormErrors = Partial<
  Record<"title" | "description" | "image" | "expires_at", string>
>;

export function validateBattle(values: BattleFormValues): BattleFormErrors {
  const errors: BattleFormErrors = {};

  if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  }
  if (values.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters long.";
  }
  if (!values.image) errors.image = "Image is required.";
  if (!values.expiresAt || values.expiresAt <= new Date()) {
    errors.expires_at = "Choose a future expiration date.";
  }

  return errors;
}

export async function createBattle(
  values: BattleFormValues,
  token?: string | null,
) {
  const formData = new FormData();
  formData.append("title", values.title.trim());
  formData.append("description", values.description.trim());
  formData.append("expires_at", values.expiresAt!.toISOString());

  if (values.image) formData.append("image", values.image);

  return axios.post<{ message?: string }>(BATTLE_URL, formData, {
    headers: { Authorization: token },
  });
}
