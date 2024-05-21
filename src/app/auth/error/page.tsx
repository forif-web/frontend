"use client";
import { GoogleLoginButton } from "@/components/navigation-bar";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [title, setTitle] = useState("알 수 없는 오류입니다.");
  const errorMessage = searchParams?.error;
  useEffect(() => {
    switch (errorMessage) {
      case "InvalidEmailAccount":
        setTitle("한양대학교 이메일 계정을 사용해주세요.");
        break;
      case "Unexpected end of JSON input":
        setTitle("서버와의 연결이 불안정합니다.");
        break;
      default:
        console.error(errorMessage)
        setTitle("알 수 없는 오류입니다.");
    }
  }, [errorMessage]);
  return (
    <main className="h-full w-full">
      <Flex
        direction="column"
        gap="2"
        className="pt-24 px-6 bg-gray-100 h-full flex items-center"
      >
        <div className="bg-white p-0 w-7/12 shadow-sm rounded-md border-2 border-gray-200 overflow-hidden max-md:w-full relative">
          <div className="bg-slate-950 flex flex-col justify-center items-center px-6 py-5 border-b-2 border-gray-200">
            <Text
              size="6"
              weight="bold"
              className="text-gray-50 mb-2 text-center"
            >
              에러 페이지
            </Text>
          </div>
          <div className="flex flex-col p-6 h-96 justify-between">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold text-red-600">{title}</h1>
              <div className="text-base break-keep flex flex-col gap-2">
                <p>다시 한번 로그인을 시도해주세요.</p>
              </div>
            </div>
            <GoogleLoginButton />
          </div>
        </div>
      </Flex>
    </main>
  );
}
