import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse, CoreNextApiRequestQuery } from "@/types/api/v1";

export interface RetrieveMembersQuery {
  memberId: number;
}

export interface RetrieveMembersApiRequest extends NextApiRequest {
  query: RetrieveMembersQuery & CoreNextApiRequestQuery;
}

export interface RetrieveMembersApiData {}

export interface RetrieveMembersApiResponse
  extends NextApiResponse<CoreApiResponse<RetrieveMembersApiData>> {}
