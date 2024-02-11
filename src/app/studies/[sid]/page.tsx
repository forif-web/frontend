"use client";
import { DetailStudyInterface, langColorMap } from "@/app/types/study";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import Summary from "@/components/pages/profile/summary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
function Page({ params }: { params: { sid: string } }) {
  const fetcher = (url: string) => axios.get(url, {}).then((res) => res.data);
  const { data, error, isLoading } = useSWR<DetailStudyInterface>(
    `/api/study/${params.sid}`,
    fetcher
  );
  if (isLoading) return <SpinningCircle message="스터디 정보 불러오는 중..." />;
  if (error)
    return (
      <div className="flex flex-col gap-5 items-centere justify-center w-full h-full">
        <h1 className="text-2xl font-bold text-red-400">ERROR {error}</h1>
        <p>현재 스터디 정보를 불러올 수 없습니다.</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold text-red-500">
          정보를 불러올 수 없습니다.
        </h1>
        <p>
          죄송합니다. 현재 스터디 정보를 불러올 수 없습니다. 이메일로 문의
          바랍니다.
        </p>
      </div>
    );

  return (
    <>
      <Summary
        name={data.studyName}
        info={`${data.mentorName} 멘토`}
        imageUrl={data.image}
      />
      <div className="flex flex-row w-10/12 max-w-4xl gap-2 justify-start pt-2">
        <Badge className="mb-0.5">{data.studyType}스터디</Badge>
        {data.tags.map((val, idx) => (
          <Badge className={`mb-0.5 bg-${langColorMap[val]}-500`} key={idx}>
            {val.toUpperCase()}
          </Badge>
        ))}
        {data.interview && (
          <Badge className="bg-red-500 hover:bg-red-400">면접</Badge>
        )}
      </div>
      <div className="w-10/12 max-w-4xl h-px bg-gray-200 mt-2 mb-4" />
      <div className="flex flex-col w-10/12 max-w-4xl py-2 gap-8">
        <div className="mb-2">
          <Text size="3" weight={"medium"} className="text-gray-900">
            {data.explanation}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text size="6" weight="bold" className="text-gray-900">
            스터디 목표
          </Text>
          <Text size="3" weight={"medium"}>
            {data.goal}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text size="6" weight="bold" className="text-gray-900">
            스터디 시간
          </Text>
          <Text size="3" weight={"medium"}>
            {data.date} {data.startTime} - {data.endTime}
          </Text>
        </div>

        <Button>
          <Link href={"/apply"} className="w-full">
            지원하기
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Page;
