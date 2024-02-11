import * as jwt from "jsonwebtoken";

/**
 * Validate user ID token
 * @returns username
 */
async function verifyIdToken(idToken: string, apiSecret: string) {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(idToken, apiSecret, {
      complete: false,
    }) as jwt.JwtPayload;
  } catch (err) {
    throw new jwt.JsonWebTokenError(
      `invalid  token`,
      err as jwt.JsonWebTokenError
    );
  }
  if (!payload) {
    throw new jwt.JsonWebTokenError(`invalid  token : no JWT payload`);
  }
  if (payload.iss !== "https://accounts.google.com" || !payload.id) {
    throw new jwt.JsonWebTokenError(
      `invalid  token : invalid JWT payload: ${JSON.stringify(payload)}`
    );
  }
  return payload.name;
}

export default verifyIdToken;
