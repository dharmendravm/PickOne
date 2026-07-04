export interface ErrorResponse {
  message: string;
  errors?: Record<string, string>;
}


export type ApiResponse<T> = T | ErrorResponse;
