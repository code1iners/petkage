import { CoreApiResponse } from "@/types/api/v1";
import { NextApiRequest, NextApiResponse } from "next";

export interface MeApiRequest extends NextApiRequest {}

export interface MeApiResponseData {}

export interface MeApiResponse
  extends NextApiResponse<CoreApiResponse<MeApiResponseData>> {}
