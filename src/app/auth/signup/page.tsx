"use client";
import RegisterForm from "@/containers/register/register-form";
import { Flex, Text } from "@radix-ui/themes";
export default function SignUp() {
  return (
    <main className="min-h-full w-full">
      <Flex
        direction="column"
        gap="2"
        className="px-6 bg-gray-100 h-screen w-full flex items-center justify-center"
      >
        <div className="bg-white p-0 w-9/12 shadow-sm rounded-md border-2 border-gray-200 overflow-hidden max-md:w-full">
          <div className="bg-slate-950 flex flex-col align-middle justify-start px-6 py-5 border-b-2 border-gray-200">
            <Text size="6" weight="bold" className="text-gray-50">
              회원가입
            </Text>
            <Text size="2" weight="medium" className="text-gray-400 mb-2">
              운영진 확인 후 가입이 승인됩니다.
            </Text>
            <Text size="2" weight="medium" className="text-gray-400">
              2/2
            </Text>
          </div>
          <div className="flex flex-col justify-start p-6 md:w-8/12">
            <RegisterForm />
          </div>
        </div>
      </Flex>
    </main>
  );
}
