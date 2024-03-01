"use client";
import ProcessCard from "@/components/pages/home/process-card";
import { useState } from "react";

interface SelectedCardState {
  card1: boolean;
  card2: boolean;
  card3: boolean;
}

export default function ProcessCards() {
  const [selectedCard, setSelectedCard] = useState<SelectedCardState>({
    card1: true,
    card2: false,
    card3: false,
  });
  function useSelctedCard(id: keyof SelectedCardState) {
    setSelectedCard({
      card1: id === "card1",
      card2: id === "card2",
      card3: id === "card3",
    });
  }
  return (
    <div className="flex md:flex-row flex-col w-full gap-5">
      <button onClick={() => useSelctedCard("card1")}>
        <ProcessCard
          step={1}
          title="로그인 및 회원가입"
          description="포리프가 스터디 등록, 인증서 발급 등 다양한 기능을 제공하기 위해 부원으로 등록해주세요. "
          reference="* 한양대학교 구글 계정 사용 필수"
          selected={selectedCard.card1}
        />
      </button>
      <button onClick={() => useSelctedCard("card2")}>
        <ProcessCard
          step={2}
          title="스터디 선택 및 지원"
          description="스터디 목록과 계획서를 참고하여 수강을 희망하는 스터디를 선택하고, 지원서를 작성해주세요!"
          reference="* 스터디 신청 일자 : 2024-02-26 ~ 2024-03-06"
          selected={selectedCard.card2}
        />
      </button>
      <button onClick={() => useSelctedCard("card3")}>
        <ProcessCard
          step={3}
          title="면접 및 선발"
          description="면접 필요 시 면접을 진행합니다. 이후 최종 결과를 전달받게 되며 포리프의 일원이 됩니다!"
          reference="* 최종 결과는 메세지로 안내됩니다."
          selected={selectedCard.card3}
        />
      </button>
    </div>
  );
}
