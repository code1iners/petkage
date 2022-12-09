import { apiCaller } from "@/libs/servers/api-caller";
import withSession from "@/libs/servers/with-session";
import { repository } from "@/libs/shared/prisma";
import type {
  ListMembersApiRequest,
  ListMembersApiResponse,
} from "@/types/api/v1/members/list-members.dto";

const handler = async (
  req: ListMembersApiRequest,
  res: ListMembersApiResponse
) => {
  try {
    // Retrieve member by id.
    const foundMember = await repository.member.findMany({
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
    });

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

export default withSession(
  apiCaller({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
