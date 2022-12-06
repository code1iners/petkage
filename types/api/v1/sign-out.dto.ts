import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse } from "@/types/api/v1";

export interface SignOutApiRequest extends NextApiRequest {}

export interface SignOutApiData {}

export interface SignOutApiResponse
  extends NextApiResponse<CoreApiResponse<SignOutApiData>> {}
