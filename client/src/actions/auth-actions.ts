"use server";

import { REGISTER_URL } from "@/lib/api-endpoints";
import axios from "axios";
import type { ApiErrorResponse } from "@/types/api";
import type {
  RegisterActionState,
  RegisterApiRequest,
  RegisterApiResponse,
} from "@/types/auth";

export async function registerAction(
  prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  try {
    const payload: RegisterApiRequest = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };
    const { data } = await axios.post<RegisterApiResponse>(
      REGISTER_URL,
      payload,
    );

    if ("statusCode" in data) {
      return {
        status: data.statusCode,
        message:
          data.message ??
          "Account created successfully please check your email and verify",
      };
    }

    return {
      status: 500,
      message: data.message ?? "Unexpected response from the server.",
      errors: data.errors ?? {},
    };
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      if (error.response?.status === 422) {
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Message:", error.message);
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
    }

    return {
      status: 500,
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }
}
