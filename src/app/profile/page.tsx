"use client";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import StudyCard from "@/components/common/study-card";
import Summary from "@/components/pages/profile/summary";
import { Button } from "@/components/ui/button";
import CertificateCardContainer from "@/containers/profile/certificate-card-container";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import { StudyInterface } from "../types/study";

export type getUserResponseType = {
  userData: userResponseType;
  studyData: StudyInterface;
};

export type userResponseType = {
  currentStudyId: number | string;
  department: string;
  email: string;
  image: string;
  passedStudyId: number[];
  phoneNumber: string;
  userId: number;
  userName: string;
};

export type studyResponseType = {
  timestamp: string;
  status: number;
  message: string;
};

export default function ProfilePage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<getUserResponseType>(
    "/api/auth/getuser",
    fetcher
  );
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
        <SpinningCircle message="잠시만 기다려주세요..." />
      </div>
    );
  }
  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  function renderCurrentStudy() {
    if (data?.studyData.studyId) {
      const {
        date,
        endTime,
        image,
        interview,
        level,
        mentorId,
        mentorName,
        startTime,
        studyId,
        studyName,
        studyType,
        tags,
      } = data.studyData;
      return (
        <StudyCard
          date={date}
          endTime={endTime}
          image={image}
          interview={interview}
          level={level}
          mentorId={mentorId}
          mentorName={mentorName}
          startTime={startTime}
          studyId={studyId}
          studyName={studyName}
          studyType={studyType}
          tags={tags}
        />
      );
    } else {
      return <h1>수강하고 있는 스터디가 없습니다.</h1>;
    }
  }

  return (
    <>
      <Summary
        imageUrl={data.userData.image}
        name={data.userData.userName}
        info={data.userData.department}
      />
      {/* divider */}
      <div className="w-10/12 max-w-4xl h-px bg-gray-200 my-4"></div>
      <div className="flex flex-col w-10/12 max-w-4xl py-2 mb-10">
        <Text size="5" weight="bold" className="text-gray-900">
          참여 중 스터디
        </Text>
        {renderCurrentStudy()}
      </div>
      <div className="flex flex-col w-10/12 max-w-4xl py-2">
        <Text size="5" weight="bold" className="text-gray-900">
          수료한 스터디
        </Text>
        <Text size="2" weight="medium" className="text-gray-400 pb-3">
          3개의 스터디를 수료했습니다.
        </Text>
        <CertificateCardContainer />
      </div>
      <div className="flex flex-col w-10/12 max-w-4xl py-2 gap-4 flex-wrap">
        <Text size="5" weight="bold" className="text-gray-900">
          계정
        </Text>
        <div className="flex flex-row gap-3 justify-start">
          <Link href={"/setting"}>
            <Button className="w-32">설정</Button>
          </Link>
          <Button
            variant={"destructive"}
            onClick={() => signOut({})}
            className="w-32"
          >
            로그아웃
          </Button>
        </div>
      </div>
    </>
  );
}
