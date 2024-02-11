"use client";
import { Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode");
  return (
    <main className="h-full w-full">
      <Flex
        direction="column"
        gap="2"
        className="pt-16 px-6 bg-gray-100 h-full flex items-center"
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
          <div className="flex flex-col p-6 md:w-8/12 h-96">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold text-red-600">
                에러가 발생했어요!
              </h1>
              <div className="text-base break-keep flex flex-col gap-2">
                <p>다시 한번 로그인을 시도해주세요.</p>
                <p>오류 코드 : {errorCode}</p>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </main>
  );
}
