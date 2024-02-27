"use client";

import { applyDataType } from "@/app/types/application";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import axios from "axios";
import useSWR from "swr";

export default function ApplicationPage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<applyDataType>(
    "/api/apply/user",
    fetcher
  );
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SpinningCircle message="지원서를 불러오는 중입니다..." />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="text-5xl font-bold mb-1">제출한 지원서</h1>
        <p>제출 일자 : 2024-02-26</p>
      </div>
      <div>
        <h1 className="">1순위 스터디</h1>
        <p className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
          {data?.primaryStudy}
        </p>
      </div>
      <div>
        <h1 className="">1순위 스터디 제출사항(자기소개)</h1>
        <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
          {data?.primaryIntro}
        </p>
      </div>
      <div>
        <h1 className="">2순위 스터디</h1>
        <p className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
          {data?.primaryStudy === ""
            ? "2순위 스터디 지원 사항 없음"
            : data?.secondaryStudy}
        </p>
      </div>
      <div>
        <h1 className="">2순위 스터디 제출사항(자기소개)</h1>
        <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
          {data?.primaryStudy === ""
            ? "2순위 스터디 지원 사항 없음"
            : data?.secondaryIntro}
        </p>
      </div>
      <div>
        <h1>경력 사항</h1>
        <p className="flex h-fit max-w-xl min-h-[40px] rounded-lg border border-input bg-background px-3 py-2 break-all">
          {data?.career}
        </p>
      </div>
    </div>
  );
}
