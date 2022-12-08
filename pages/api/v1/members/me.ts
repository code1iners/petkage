import { apiCaller } from "@/libs/servers/api-caller";
import withSession from "@/libs/servers/with-session";
import { prismaClient } from "@/libs/shared/prisma";
import { MeApiRequest, MeApiResponse } from "@/types/api/v1/members/me.dto";

const handler = async (req: MeApiRequest, res: MeApiResponse) => {
  try {
    const { member } = req.session;

    // Retrieve me by id.
    const foundMe = await prismaClient.member.findUnique({
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
      where: { id: member.id },
    });

    // There is no me?
    if (!foundMe) {
      return res.status(404).json({
        ok: false,
        error: {
          code: "EE03",
          message: "Does not found me.",
        },
      });
    }

    return res.status(200).json({
      ok: true,
      data: foundMe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: {
        code: "E01",
        message: "Failed fetching me.",
      },
    });
  }
};

export default withSession(
  apiCaller({
    methods: ["GET"],
    handler,
  })
);
