import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse, CoreNextApiRequestQuery } from "@/types/api/v1";

export interface ListMembersApiRequest extends NextApiRequest {}

export interface ListMembersApiData {}

export interface ListMembersApiResponse
  extends NextApiResponse<CoreApiResponse<ListMembersApiData>> {}
