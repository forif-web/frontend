"use client";
import { userResponseType } from "@/app/types/user";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import useSWR from "swr";

export default function CoursePage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<userResponseType>(
    "/api/auth/getuser",
    fetcher
  );

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
      <Text size={"5"} className="text-left">
        수강 중인 스터디
      </Text>
    </div>
  );
}
