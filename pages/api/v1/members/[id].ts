import type { NextApiRequest, NextApiResponse } from "next";
import { apiCaller } from "@/libs/servers/api-caller";
import { repository } from "@/libs/shared/prisma";
import type { HttpMethod } from "@/types/api/v1";
import type {
  RetrieveMemberByIdRequest,
  RetrieveMemberByIdResponse,
} from "@/types/api/v1/members/retrieve-member-by-id.dto";
import {
  DeleteMemberByIdRequest,
  DeleteMemberByIdResponse,
} from "@/types/api/v1/members/delete-member-by-id.dto";

const retrieveMemberHandler = async (
  req: RetrieveMemberByIdRequest,
  res: RetrieveMemberByIdResponse
) => {
  try {
    // Checking parameter.
    if (!req.query.id) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "E01",
          message: "Member id is required by path parameter.",
        },
      });
    }

    const { id } = req.query;
    // Id type is not number?
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "E02",
          message: "Parameter type is should be number.",
        },
      });
    }

    // Retrieve member by id.
    const foundMember = await repository.member.findFirst({
      select: {
        id: true,
        identification: true,
        name: true,
        avatar: true,
        gender: true,
        phoneNumber: true,
        isDormant: true,
        membershipRating: true,
      },
      where: { id: +id },
    });

    if (!foundMember) {
      return res.status(404).json({
        ok: false,
        error: {
          code: "E02",
          message: "Does not found the member.",
        },
      });
    }

    return res.status(200).json({
      ok: true,
      data: foundMember,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: {
        code: "E01",
        message: "Failed retrieve member by id.",
      },
    });
  }
};

const deleteMemberHandler = async (
  req: DeleteMemberByIdRequest,
  res: DeleteMemberByIdResponse
) => {
  try {
    //

    repository;

    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: {
        code: "E01",
        message: "Failed delete member by id.",
      },
    });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.method) throw new Error("Http method is required.");

  switch (req.method as HttpMethod) {
    case "GET":
      return retrieveMemberHandler(req, res);

    case "DELETE":
      return deleteMemberHandler(req, res);
  }
};

export default apiCaller({
  methods: ["GET", "DELETE"],
  handler,
  isPrivate: false,
});
