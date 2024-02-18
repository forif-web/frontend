type JwtPayload = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
};

/**
 * Validate user ID token
 * @returns username
 */
function verifyIdToken(idToken: string | undefined) {
  const base64Url = idToken!.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const payload: JwtPayload = JSON.parse(jsonPayload);
  if (payload.exp < Date.now() / 1000) {
    console.error("만료된 토큰입니다.");
    return false;
  }
  return true;
}

export default verifyIdToken;
