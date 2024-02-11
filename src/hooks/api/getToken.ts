import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export default async function getToken({
  req,
}: {
  req: NextApiRequest | NextRequest;
}) {
  const authorizationHeader =
    req.headers instanceof Headers
      ? req.headers.get("authorization")
      : req.headers?.authorization;

  if (authorizationHeader?.split(" ")[0] === "Bearer") {
    const urlEncodedToken = authorizationHeader.split(" ")[1];
    const token = decodeURIComponent(urlEncodedToken);
    return token;
  } else {
    return null;
  }
}
