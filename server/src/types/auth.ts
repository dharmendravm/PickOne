import type { ErrorResponse } from "./api.js";

export interface RegisterApiRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
}

export type AuthApiResponse = AuthResponse | ErrorResponse;


export interface LoginApiRequest {
  name: string;
  password: string;
}
