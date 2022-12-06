import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse } from "@/types/api/v1";

export interface SignInApiRequest extends NextApiRequest {
  body: {
    identification: string;
    password: string;
  };
}

export interface SignInApiData {
  accessToken: string;
}

export interface SignInApiResponse
  extends NextApiResponse<CoreApiResponse<SignInApiData>> {}
