import { NextApiRequest, NextApiResponse } from "next";

const signInHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(res);

    return res.status(201).json({
      ok: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
    });
  }
};

export default signInHandler;
