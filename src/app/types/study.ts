interface StudyInterface {
  studyId: number;
  tags: string[];
  mentorId: number;
  studyName: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  level: 1 | 2 | 3 | 4 | 5;
  date: string;
  interview: boolean;
  image: string;
  studyType: "자율" | "정규";
}

interface DetailStudyInterface extends StudyInterface {
  goal: string;
  explanation: string;
  mentorEmail: string | null;
  location: any;
  maximumUsers: any;
  reference: any;
  weeklyPlan: any;
  conditions: any;
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
