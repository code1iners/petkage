import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse } from "@/types/api/v1";

export interface SignUpApiRequest extends NextApiRequest {
  body: {
    identification: string;
    name: string;
    password: string;
  };
}

export interface SignUpApiResponse extends NextApiResponse<CoreApiResponse> {}
