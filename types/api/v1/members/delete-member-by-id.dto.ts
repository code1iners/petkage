import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse } from "@/types/api/v1";

export interface DeleteMemberByIdRequest extends NextApiRequest {}

export interface DeleteMemberByIdResponseData {}

export interface DeleteMemberByIdResponse
  extends NextApiResponse<CoreApiResponse<DeleteMemberByIdResponseData>> {}
