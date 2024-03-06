import { Text } from "@radix-ui/themes";
import moment from "moment";
import "moment/locale/ko";
import React from "react";
import { duration } from "../constant/duration";

async function ApplyPageLayout({ children }: { children: React.ReactNode }) {
  const nowTime = moment().format("YYYY-MM-DD");
  const isApplyDate = duration.some((val) => val === nowTime);
  if (!isApplyDate) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
        <Text size={"8"} weight={"bold"}>
          현재 신청 기간이 아닙니다.
        </Text>
      </div>
    );
  }
  return (
    <div className="mb-8 min-h-full h-fit">
      <div className="h-52" />
      {/* w-10/12, md: w-full */}
      <div className="flex flex-col items-center">
        <h1 className="text-[44px] font-bold flex space-y-4 w-10/12 max-w-xl">
          스터디 신청하기
        </h1>
        {/* <Text
          size={"3"}
          color="tomato"
          className="mb-5 flex space-y-4 w-10/12 max-w-xl"
        >
          폼 작성 후 입금까지 완료해야 신청 절차가 모두 완료됩니다. 입금 확인은
          프로필에서 확인가능합니다.
        </Text>
        <Text size={"3"} className="flex space-y-4 w-10/12 max-w-xl">
          79799136981 카카오뱅크
        </Text>
        <Text size={"3"} className="mb-5 flex space-y-4 w-10/12 max-w-xl">
          (정규 스터디 : 35000원 / 자율 스터디 : 30000원)
        </Text> */}
        <Text size={"3"} color="gray" className="mb-5">
          한 학기에 정규 스터디 하나만 수강가능합니다.(자율 스터디는 포함되지
          않습니다.)
        </Text>
        <p className="text-sm flex space-y-4 w-10/12 max-w-xl">
          2024-1 FORIF 부원 모집
        </p>
      </div>
      <div className="h-8" />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default ApplyPageLayout;
