export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
}

export type ApiResponse<T> = T | ApiErrorResponse;
