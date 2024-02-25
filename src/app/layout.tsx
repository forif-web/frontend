import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation-bar";
import SessionProvider from "@/components/sessionProvider";
import MyToastContainer from "@/components/ui/toast";
import TimeWrapper from "@/containers/time-wrapper";
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
      <body className={cn("h-full scrollbar-none", Pretendard.className)}>
        <TimeWrapper>
          <Theme accentColor="indigo" className="h-full">
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
        </TimeWrapper>
      </body>
    </html>
  );
}

const url = "https://forif.org";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FORIF",
    description: "FORIF Integration Management Website",
    url: url,
    siteName: "FORIF",
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
