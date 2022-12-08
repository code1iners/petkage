import { hash } from "bcrypt";
import { prismaClient } from "@/libs/shared/prisma";
import type {
  SignUpApiRequest,
  SignUpApiResponse,
} from "@/types/api/v1/auth/sign-up.dto";
import { apiCaller } from "@/libs/servers/api-caller";

const handler = async (req: SignUpApiRequest, res: SignUpApiResponse) => {
  try {
    const { identification, name, password } = req.body;

    // Check is already exist member identification.
    const foundMember = await prismaClient.member.findUnique({
      select: { id: true },
      where: { identification },
    });

    // Already exist identification?
    if (foundMember)
      return res.status(400).json({
        ok: false,
        error: {
          code: "E02",
          message: "Alread the identification exist.",
        },
      });

    // Encode password.
    let encodedPassword;
    try {
      encodedPassword = await hash(password, 10);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        error: {
          code: "E03",
          message: "Failed password encoding.",
        },
      });
    }

    const createdMemberId = await prismaClient.member.create({
      select: { id: true },
      data: { identification, name, password: encodedPassword },
    });
    if (!createdMemberId)
      return res.status(500).json({
        ok: false,
        error: {
          code: "E04",
          message: "Failed create a new member.",
        },
      });

    return res.status(201).json({
      ok: true,
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
  methods: ["POST"],
  handler,
  isPrivate: false,
});
