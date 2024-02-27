"use client";
import { DetailStudyInterface } from "@/app/types/study";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Badge } from "@/components/ui/badge";
import HoverCard from "@/components/ui/hover-card/hover-card";
import { Card, Strong, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import useSWR from "swr";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

function Page({ params }: { params: { sid: string } }) {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR<DetailStudyInterface>(
    `/api/study/${params.sid}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-centere justify-center w-full h-screen">
        <SpinningCircle message="스터디 불러오는 중..." />
      </div>
    );
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

  function renderDifficulty() {
    if (data?.level) {
      switch (data.level) {
        case 1:
          return (
            <Text size={"7"}>
              <Strong>입문자</Strong>를 위해 준비한
            </Text>
          );
        case 2:
          return (
            <Text size={"7"}>
              <Strong>초급자</Strong>를 위해 준비한
            </Text>
          );
        case 3:
          return (
            <Text size={"7"}>
              <Strong>중급자</Strong>를 위해 준비한
            </Text>
          );
        case 4:
          return (
            <Text size={"7"}>
              <Strong>숙련자</Strong>를 위해 준비한
            </Text>
          );
        default:
          return (
            <Text size={"7"}>
              <Strong>숙련자</Strong>를 위해 준비한
            </Text>
          );
      }
    }
  }
  console.log(data.image);

  return (
    <>
      <section className="w-full md:bg-[#2d2f31] md:py-8 mb-8">
        <div className="md:max-w-6xl mx-auto my-0 flex md:flex-row flex-col items-center md:justify-between">
          <Image
            src={data.image}
            width={1000}
            height={1000}
            className="object-cover border-white bg-gray-400 w-full md:hidden block"
            alt="profile"
          />
          <div className="flex flex-col gap-4 mx-6 md:w-8/12 mt-6">
            <div className="w-full md:flex hidden justify-between">
              <div className="flex flex-row w-10/12 max-w-4xl gap-2 justify-start pt-2">
                <Badge className="mb-0.5">{data.studyType}스터디</Badge>
                {data.tags &&
                  Object.keys(data.tags).map((tag, idx) => (
                    <Badge
                      className={`mb-0.5 bg-${
                        data.tags[tag] || "black"
                      }-500 hover:bg-${data.tags[tag]}-400`}
                      key={idx}
                    >
                      {tag.toUpperCase()}
                    </Badge>
                  ))}
                {data.interview && (
                  <Badge className="bg-red-500 hover:bg-red-400">면접</Badge>
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold md:text-white text-center md:text-left">
              {data.studyName}
            </h1>
            <p className="text-base font-medium md:text-white overflow-ellipsis overflow-hidden mb-4">
              {data.explanation}
            </p>

            <div className="flex md:flex-row flex-col justify-between">
              <Text size={"3"} weight={"medium"} className="md:text-white">
                Created by{" "}
                <HoverCard
                  id={data.mentorId}
                  name={data.mentorName}
                  email={data.mentorEmail!}
                >
                  <span className="cursor-pointer">{data.mentorName} 멘토</span>
                </HoverCard>{" "}
              </Text>
              <Text size={"3"} weight={"medium"} className="md:text-white">
                {data.date} {data.startTime.substring(0, 5)} -{" "}
                {data.endTime.substring(0, 5)}
              </Text>
            </div>
          </div>
          <Image
            src={data.image}
            width={1000}
            height={1000}
            className="rounded-xl object-contain w-3/12 md:block hidden"
            alt="profile"
          />
        </div>
      </section>
      <section className="w-full max-w-6xl mx-auto mb-8 flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-12">
          <div className="max-w-4xl my-0 w-fit px-4 flex flex-col">
            {renderDifficulty()}
            <Text size={"7"}>
              <Strong>
                [
                {data.tags &&
                  Object.keys(data.tags).map((val, idx, arr) => {
                    if (idx + 1 === arr.length) {
                      return <span>{val.toUpperCase()}</span>;
                    } else {
                      return <span>{val.toUpperCase()},</span>;
                    }
                  })}
                ] 강의입니다.
              </Strong>
            </Text>
          </div>
          <div className="max-w-4xl my-0 w-fit px-4 grid md:grid-cols-2 max-h-fit gap-5">
            <Card
              variant="surface"
              className="h-full hover:border-ring transition-all duration-300"
            >
              <div className="py-2">
                <Text as="p" size="5" weight="bold" className="mb-4">
                  스터디 목표
                </Text>
                <Text as="p" size="2" className="flex flex-row gap-2">
                  <FaCheck />
                  {data.goal}
                </Text>
              </div>
            </Card>
            <Card
              variant="surface"
              className="h-full hover:border-ring transition-all duration-300"
            >
              <div className="py-2">
                <Text as="p" size="5" weight="bold" className="mb-4">
                  이수(인증서 발급) 요건
                </Text>
                <Text as="p" size="2" className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <FaCheck />
                    해커톤 참여
                  </div>
                  <div className="flex flex-row gap-2">
                    <FaCheck />
                    {data.conditions}
                  </div>
                </Text>
              </div>
            </Card>
            <Card
              variant="surface"
              className="h-fit hover:border-ring transition-all duration-300"
            >
              <div className="py-2">
                <Text as="p" size="5" weight="bold" className="mb-4">
                  강의실 위치
                </Text>
                <Text as="p" size="2" className="flex flex-row gap-2">
                  <FaCheck />
                  {data.location}
                </Text>
              </div>
            </Card>
            <Card
              variant="surface"
              className="h-fit hover:border-ring transition-all duration-500"
            >
              <div className="py-2">
                <Text as="div" size="5" weight="bold" className="mb-4">
                  최대 수용 인원
                </Text>
                <Text as="div" size="2" className="flex flex-row gap-2">
                  {data.maximumUsers}
                </Text>
              </div>
            </Card>
          </div>
          <div className="max-w-4xl flex flex-col px-4 mb-12 md:mb-0">
            <Text size={"5"} weight={"bold"}>
              참고자료
            </Text>
            {decodeURI(data.reference)}
          </div>
        </div>
        <div className="w-fit">
          <div className="max-w-4xl my-0 w-fit px-4 mx-auto">
            <Text as="div" size="6" weight="bold" className="md:mb-4">
              주차별 계획
            </Text>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>주차</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>내용</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              {data.weeklyPlans.map((val, idx) => (
                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell className="max-w-max">
                      {idx + 1}주차
                    </Table.RowHeaderCell>
                    <Table.Cell>{val === "" ? "계획 없음" : val}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table.Root>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
