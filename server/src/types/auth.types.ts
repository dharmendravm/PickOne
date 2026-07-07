import type { ApiResponse } from "./api.js";

export interface RegisterApiRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface RegisterResponse {
  statusCode: number;
  message: string;
}

export interface LoginApiRequest {
  name: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  statusCode: number;
  message: string;
  data: JwtPayload;
}

export type LoginApiResponse = ApiResponse<LoginResponse>;
export type RegisterApiResponse = ApiResponse<RegisterResponse>;
