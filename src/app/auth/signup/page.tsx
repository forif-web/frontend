import RegisterForm from "@/containers/register/register-form";
import verifyIdToken from "@/hooks/verifyIdToken";
import { Flex, Text } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function SignUp() {
  //signIn 과정을 거쳤는가?
  const cookieList = cookies();
  if (!cookieList.has("id_token")) redirect("/auth/signin");

  // 토큰 검증
  const idToken = cookieList.get("id_token")?.value;
  if (!verifyIdToken(idToken)) {
    redirect("/auth/signin");
  }

  return (
    <main className="min-h-full w-full pt-[30px]">
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
          </div>
          <div className="flex flex-col justify-start p-6 md:w-8/12">
            <RegisterForm idToken={idToken} />
          </div>
        </div>
      </Flex>
    </main>
  );
}
