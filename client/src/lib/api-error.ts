import axios from "axios";

import type { ApiErrorResponse } from "@/types/api";
import type { AuthActionState } from "@/types/auth";

export function handleApiError(error: unknown): AuthActionState {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      status: error.response?.status ?? 500,
      message:
        error.response?.data.message ??
        "Something went wrong. Please try again.",
      errors: error.response?.data.errors ?? {},
    };
  }

  return {
    status: 500,
    message: "Something went wrong. Please try again.",
    errors: {},
  };
}