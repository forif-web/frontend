import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import { cookies } from "next/headers";
export type signInResponseType = existMemberResponse | newMemberResponse;

export type existMemberResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type newMemberResponse = {
  id: number;
  email: string;
  userName: string;
  department: string;
  image: string;
  phoneNumber: string;
  userAuthorization: string;
  apply: null | string[];
};

const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Naver({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.token = token;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (profile && user && account) {
        if (profile.email?.endsWith("hanyang.ac.kr")) {
          const data = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/signin`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${account.id_token}`,
              },
              cache: "no-cache",
            }
          );
          const res: signInResponseType = await data.json();
          if ("id" in res) {
            cookies().set("idToken", account.id_token!);

            return true;
          } else {
            //요청이 잘못되었거나, 새로 가입한 회원
            if (res.error === "Unauthorized") {
              //새로 가입한 회원일시
              cookies().set("id_token", account.id_token!);
              return "/auth/signup";
            } else {
              //요청이 잘못되었을시
              return "/auth/error?error=InvalidServerResponse";
            }
          }
        } else {
          return "/auth/error?error=InvalidEmailAccount";
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
} satisfies NextAuthOptions;
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
export { authOptions };
