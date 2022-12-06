import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    member: {
      id: number;
    };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      SESSION_KEY: string;
    }
  }
}

export const sessionOptions = {
  cookieName: process.env.SESSION_KEY,
  password: process.env.SECRET_KEY!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
} as IronSessionOptions;

export default function withSession(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
