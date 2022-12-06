import withSession from "@/libs/servers/with-session";
import type {
  SignOutApiRequest,
  SignOutApiResponse,
} from "@/types/api/v1/auth/sign-out.dto";

const signOutHandler = async (
  req: SignOutApiRequest,
  res: SignOutApiResponse
) => {
  try {
    // Clear session of member.
    req.session.destroy();
    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      error: {
        code: "E01",
        message: (err as any).message,
      },
    });
  }
};

export default withSession(signOutHandler);
