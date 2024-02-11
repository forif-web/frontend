import "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface myJWT extends DefaultJWT {
  id_token?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      token: myJWT;
    } & DefaultSession["user"];
  }
}
