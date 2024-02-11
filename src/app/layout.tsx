import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation-bar";
import SessionProvider from "@/components/sessionProvider";
import MyToastContainer from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "pretendard/dist/web/static/pretendard.css";
import { Pretendard } from "./fonts/fonts";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="ko">
      <head>
        <title>FORIF</title>
      </head>
      <body className={cn("h-full scrollbar-hide", Pretendard.className)}>
        <Theme accentColor="iris" className="h-full">
          <SessionProvider session={session}>
            <NavigationBar />
            {children}
            <Footer />
            <MyToastContainer
              autoClose={2000}
              position="bottom-left"
              theme="dark"
            />
          </SessionProvider>
        </Theme>
      </body>
    </html>
  );
}

const url = "https://frontend-fororo.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fororo",
    description: "FORIF Integration Management Website",
    url: url,
    siteName: "Fororo",
    images: [
      {
        url: "https://imgur.com/RCuyB05.png",
        alt: "포리프 블랙 로고",
      },
      {
        url: "https://i.imgur.com/bLWTCII.png",
        alt: "글자 있는 포리프 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
    alternateLocale: "en_US",
    countryName: "Seoul",
    emails: ["forif.contact@gmail.com", "standardstar@hanyang.ac.kr"],
  },
};
