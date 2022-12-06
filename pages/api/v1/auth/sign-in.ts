import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { prismaClient } from "@/libs/shared/prisma";
import withSession from "@/libs/servers/with-session";
import type {
  SignInApiRequest,
  SignInApiResponse,
} from "@/types/api/v1/sign-in.dto";

const signInHandler = async (req: SignInApiRequest, res: SignInApiResponse) => {
  try {
    const { identification, password } = req.body;

    // Check identification exist.
    const foundMember = await prismaClient.member.findUnique({
      select: { id: true, password: true },
      where: { identification },
    });
    if (!foundMember)
      return res.status(404).json({
        ok: false,
        error: {
          code: "E02",
          message: "Does not found the member.",
        },
      });

    // Check password.
    let isPasswordValid = false;
    try {
      isPasswordValid = await compare(password, foundMember.password);
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: {
          code: "E03",
          message: (err as any).message,
        },
      });
    }
    if (!isPasswordValid)
      return res.status(500).json({
        ok: false,
        error: {
          code: "E04",
          message: "Password is not valid.",
        },
      });

    // Update session.
    req.session.member = { id: foundMember.id };
    await req.session.save();

    // Sign access token.
    const accessToken = sign({ id: foundMember.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      ok: true,
      data: { accessToken },
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

export default withSession(signInHandler);
