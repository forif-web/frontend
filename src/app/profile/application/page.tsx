"use client";

import { applyDataType } from "@/app/types/application";
import axios from "axios";
import useSWR from "swr";

export default function ApplicationPage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<applyDataType>(
    "/api/apply/user",
    fetcher
  );
  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-5xl font-bold">제출한 지원서</h1>
      <div>
        <h1 className="text-3xl">1순위 스터디</h1>
        <h1 className="text-base">{data?.primaryStudy}</h1>
      </div>
      <div>
        <h1 className="text-3xl">1순위 스터디 자기소개</h1>
        <p className="text-base">{data?.primaryIntro}</p>
      </div>
      <div>
        <h1 className="text-3xl">2순위 스터디</h1>
        <h1 className="text-base">{data?.secondaryStudy}</h1>
      </div>
      <div>
        <h1 className="text-3xl">2순위 스터디 자기소개</h1>
        <p className="text-base">{data?.secondaryIntro}</p>
      </div>
    </div>
  );
}
