"use client";
import { userResponseType } from "@/app/types/user";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Button } from "@/components/ui/button";
import { Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
export default function AccountPage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SpinningCircle message="잠시만 기다려주세요..." />
      </div>
    );
  }
  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <Text size={"3"} weight={"bold"}>
            프로필 이미지
          </Text>
          <Flex direction={"row"}>
            <Image
              src={data.image}
              width={120}
              height={120}
              alt="PROFILE IMAGE"
              className="rounded-full mr-5"
            />
            <div>
              <Button size={"lg"}>변경</Button>
            </div>
          </Flex>
        </div>
        <div className="flex flex-col">
          <Text size={"2"} weight={"bold"}>
            부원명
          </Text>
          <Text size={"6"} weight={"light"}>
            {data.userName}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text size={"2"} weight={"bold"}>
            소속 학과
          </Text>
          <Text size={"6"} weight={"light"}>
            {data.department}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text size={"2"} weight={"bold"}>
            이메일
          </Text>
          <Text size={"6"} weight={"light"}>
            {data.email}
          </Text>
        </div>
        <Button variant={"destructive"} onClick={() => signOut()}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}
