import type { NextApiRequest, NextApiResponse } from "next";
import type { CoreApiResponse, HttpMethod } from "@/types/api/v1";

interface ApiCallerInputs {
  methods: HttpMethod[];
  handler: any;
  isPrivate?: boolean;
}

export const apiCaller = ({
  methods,
  handler,
  isPrivate = true,
}: ApiCallerInputs) => {
  return (req: NextApiRequest, res: NextApiResponse<CoreApiResponse>) => {
    try {
      if (
        req.method &&
        !methods.includes(req.method.toUpperCase() as HttpMethod)
      ) {
        return res.status(405).json({
          ok: false,
          error: {
            code: "E98",
            message: "Method not allowd",
          },
        });
      }

      if (isPrivate && !req.session?.member) {
        return res.status(401).json({
          ok: false,
          error: {
            code: "E02",
            message: "Unauthorized.",
          },
        });
      }

      handler(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        error: {
          code: "E99",
          message: "Failed http request.",
        },
      });
    }
  };
};
