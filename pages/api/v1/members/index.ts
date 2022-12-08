import { apiCaller } from "@/libs/servers/api-caller";
import { prismaClient } from "@/libs/shared/prisma";
import type {
  RetrieveMembersApiRequest,
  RetrieveMembersApiResponse,
} from "@/types/api/v1/members/retrieve-members.dto";

const handler = async (
  req: RetrieveMembersApiRequest,
  res: RetrieveMembersApiResponse
) => {
  try {
    if (!req.query.memberId) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "E02",
          message: "Member ID parameter is required.",
        },
      });
    }

    if (isNaN(req.query.memberId)) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "E03",
          message: "Member ID parameter is should be number type.",
        },
      });
    }

    const { memberId } = req.query;

    // Retrieve member by id.
    const foundMember = await prismaClient.member.findUnique({
      select: {
        id: true,
        identification: true,
        name: true,
        avatar: true,
        gender: true,
        phoneNumber: true,
        isDormant: true,
        isEmailVerified: true,
        isPhoneNumberVerified: true,
        membershipRating: true,
      },
      where: { id: +memberId },
    });

    // There is no member?
    if (!foundMember) {
      return res.status(404).json({
        ok: false,
        error: {
          code: "E04",
          message: `The member(${memberId}) does not found.`,
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
        message: (err as any).message,
      },
    });
  }
};

export default apiCaller({
  methods: ["GET"],
  handler,
  isPrivate: false,
});
