interface StudyInterface {
  clubId: number;
  date: string;
  startTime: string;
  endTime: string;
  interview: boolean;
  level: 1 | 2 | 3 | 4 | 5;
  mentorName: string;
  mentorId: number;
  studyId: number;
  studyName: string;
  image: string;
  studyType: "정규" | "자율";
  tags: string[];
}

interface DetailStudyInterface extends StudyInterface {
  goal: string;
  explanation: string;
}

export const langColorMap: Record<string, string> = {
  flutter: "blue",
  react: "sky",
  javascript: "orange",
  c: "lime",
  python: "yellow",
  nextjs: "gray",
  java: "rose",
  algorithm: "gray",
};

export type { DetailStudyInterface, StudyInterface };
