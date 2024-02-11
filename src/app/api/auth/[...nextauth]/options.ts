import ToastEmitter from "@/hooks/toastEmitter";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";

export type signInResponseType = {
  data: {
    id: number;
    email: string;
    userName: string;
    department: string;
    image: string;
    userAuthorization: "관리자" | "유저" | "운영진";
  };
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
            }
          );
          const res = await data.json();
          if (res) return true;
          else return "/auth/error/?errorCode=405";
        } else {
          ToastEmitter({
            type: "error",
            text: "한양대학교 계정을 사용해주세요.",
          });
          return "/auth/error";
        }
      }
      ToastEmitter({ type: "success", text: "로그인에 성공했습니다!" });
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthOptions;

export { authOptions };
