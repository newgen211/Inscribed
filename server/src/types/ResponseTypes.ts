export interface ErrorResponse {
  timestamp: number;
  message: string;
  code: number;
  errors?: Array<{ field: string; message: string; code?: string | number }>;
}

export interface SuccessResponse {
  timestamp: number;
  message: string;
  code: number;
}

export type APIResponse = ErrorResponse | SuccessResponse;
