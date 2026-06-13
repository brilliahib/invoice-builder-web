export type ApiResponse<T = any> = {
  data: T | null;
  error: string | null;
  message?: string;
};
