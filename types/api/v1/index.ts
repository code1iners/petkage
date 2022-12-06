export interface CoreApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: CoreError;
}

export interface CoreError {
  code: string;
  message: string;
}
