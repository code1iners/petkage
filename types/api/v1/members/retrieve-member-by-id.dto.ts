import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse, CoreNextApiRequestQuery } from "@/types/api/v1";

export interface RetrieveMemberByIdRequest extends NextApiRequest {
  query: { id?: number } & CoreNextApiRequestQuery;
}

export interface RetrieveMemberByIdResponseData {}

export interface RetrieveMemberByIdResponse
  extends NextApiResponse<CoreApiResponse<RetrieveMemberByIdResponseData>> {}
