import type { ApiResponse } from "./api";

export interface RegisterActionState {
  status?: number;
  message?: string;
  errors?: Record<string, string>;
}

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

export type RegisterApiResponse = ApiResponse<RegisterResponse>;

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
  data: JwtPayload & {
    token: string;
  };
}

export type LoginApiResponse = ApiResponse<LoginResponse>;