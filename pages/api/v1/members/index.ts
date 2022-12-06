import type {
  RetrieveMembersApiRequest,
  RetrieveMembersApiResponse,
} from "@/types/api/v1/members/retrieve-members.dto";

const retrieveMembers = (
  req: RetrieveMembersApiRequest,
  res: RetrieveMembersApiResponse
) => {
  try {
    console.log(req.query.memberId);
    return res.status(200).json({
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

export default retrieveMembers;
