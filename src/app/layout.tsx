import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation-bar";
import SessionProvider from "@/components/sessionProvider";
import MyToastContainer from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "pretendard/dist/web/static/pretendard.css";
import { Pretendard } from "./fonts/fonts";
import "./globals.css";
async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="ko">
      <head>
        <title>FORIF</title>
      </head>
      <body className={cn("h-full scrollbar-none", Pretendard.className)}>
        <Theme accentColor="sky" className="h-full">
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
        <GoogleAnalytics gaId="G-V03BMRQVEJ" />
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;

const url = "https://forif.org";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FORIF",
    description: "지식의 선순환에 동참하세요.",
    url: url,
    siteName: "FORIF",
    images: [
      {
        url: "https://res.cloudinary.com/dheikvmxu/image/upload/v1709481103/logo_1_st8m2v.png",
        alt: "포리프 블랙 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
    alternateLocale: "en_US",
    countryName: "Seoul",
    emails: ["forif.contact@gmail.com", "standardstar@hanyang.ac.kr"],
  },
};
