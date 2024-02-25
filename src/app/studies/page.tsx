"use client";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Input } from "@/components/ui/input";
import StudyCardContainer from "@/containers/studies/study-card-container";
import useStudySearch from "@/hooks/search-study";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import { StudyInterface } from "../types/study";
const StudiesPage = () => {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          "Cache-Control": "no-store",
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR<StudyInterface[]>(
    "/api/study",
    fetcher
  );
  const { searchInput, filteredStudyData, handleSearchInputChange } =
    useStudySearch({
      studyData: data,
    });
  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
        <SpinningCircle message="스터디를 불러오는 중입니다..." />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col gap-5 items-centere justify-center w-full h-full">
        <h1 className="text-2xl font-bold text-red-400">ERROR {error}</h1>
        <p>현재 스터디 목록을 불러올 수 없습니다.</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold text-red-500">
          스터디가 존재하지 않습니다.
        </h1>
        <p>
          죄송합니다. 현재 스터디 목록이 존재하지 않습니다. 새로고침 혹은
          이메일로 문의 바랍니다.
        </p>
      </div>
    );

  return (
    <div className="pt-16 mb-8 min-h-full h-fit">
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-10/12 max-w-4xl">
          <div className="mt-2">
            <span className="font-bold text-3xl">스터디 목록</span>
          </div>
          <div className="mb-4">
            <span className="text-base text-gray-500">
              {data.length - 1}개의 스터디가 개설되어있습니다.
            </span>
          </div>
          <div className="relative flex flex-row mb-8 items-center justify-start">
            <Image
              src={"/icons/search_icon.svg"}
              width={16}
              height={16}
              alt="Search Icon"
              className="absolute ml-2"
            />
            <Input
              type="text"
              placeholder="스터디 이름 또는 언어로 검색해보세요!"
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="flex-grow pl-7"
            />
          </div>
          {searchInput && filteredStudyData.length === 0 ? (
            <h1 className="text-base font-bold">
              검색결과와 일치하는 스터디가 존재하지 않습니다.
            </h1>
          ) : (
            <StudyCardContainer studyValue={filteredStudyData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudiesPage;
