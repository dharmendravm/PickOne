"use server";

import axios from "axios";
import { handleApiError } from "@/lib/api-error";
import {
  CHECK_CREDENTIALS_URL,
  FORGOT_PASSWORD_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
} from "@/lib/api-endpoints";
import type {
  AuthActionState,
  LoginActionState,
  LoginApiRequest,
  LoginApiResponse,
  RegisterApiRequest,
  RegisterApiResponse,
} from "@/types/auth";

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  try {
    const payload: LoginApiRequest = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { data } = await axios.post<LoginApiResponse>(
      CHECK_CREDENTIALS_URL,
      payload,
    );

    if ("statusCode" in data) {
      return {
        status: data.statusCode,
        message: data.message ?? "Logged in successfully",
        data: {
          email: data.data.email,
          password: formData.get("password") as string,
        },
      };
    }
    return {
      status: 500,
      message: data.message ?? "Unexpected response from the server.",
      errors: data.errors ?? {},
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
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
    return handleApiError(error);
  }
}

export async function forgotPasswordAction(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const payload = {
      email: formData.get("email") as string,
    };

    const { data } = await axios.post(FORGOT_PASSWORD_URL, payload);

    if ("statusCode" in data) {
      return {
        status: data.statusCode,
        message:
          data.message ??
          "If that email address is in our system, we have sent a password reset link to it.",
        data: {},
      };
    }
    return {
      status: 500,
      message: data.message ?? "Unexpected response from the server.",
      errors: data.errors ?? {},
    };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function resetPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
) {
  try {
    const payload = {
      email: formData.get("email") as string,
      token: formData.get("token") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };

    const { data } = await axios.post(RESET_PASSWORD_URL, payload);

    if ("statusCode" in data) {
      return {
        status: data.statusCode,
        message: data.message ?? "Your password has been reset successfully.",
        data: {},
      };
    }
    return {
      status: 500,
      message: data.message ?? "Unexpected response from the server.",
      errors: data.errors ?? {},
    };
  } catch (error) {
    return handleApiError(error);
  }
}
