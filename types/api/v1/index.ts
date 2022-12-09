export type CoreNextApiRequestQuery = Partial<{
  [key: string]: string | string[];
}>;

export interface CoreApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: CoreError;
}

export interface CoreError {
  code: string;
  message: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
