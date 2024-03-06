"use client";
import SpinningCircle from "@/components/common/skeleton/spinning-circle";
import { Table, Text } from "@radix-ui/themes";
import axios from "axios";
import useSWR from "swr";

type SimpleStudyType = {
  studyName: string;
  mentorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reference: string;
  location: string;
  weeklyPlans: string[];
};

export default function CoursePage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<SimpleStudyType>(
    "/api/study/user",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SpinningCircle message="잠시만 기다려주세요..." />
      </div>
    );
  }
  if (!data || !data.weeklyPlans) {
    return (
      <div className="">
        <Text size={"7"} weight={"bold"}>
          지원한 스터디가 없거나, 아직 멘토가 승낙하지 않았습니다.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <Text as="p" size={"8"} weight={"bold"}>
          {data.studyName}
        </Text>
        <Text as="p" size={"5"}>
          Created By {data.mentorName}
        </Text>
      </div>
      <Text size={"5"}>
        {data.date} {data.startTime} - {data.endTime}
      </Text>
      <div className="w-full">
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
              <Table.Row key={idx}>
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
  );
}
