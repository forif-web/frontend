export type TagType = {
  [key: string]: string;
};

interface StudyInterface {
  studyId: number;
  tags: TagType;
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
  explanation?: string;
}

interface DetailStudyInterface extends StudyInterface {
  goal: string;
  explanation: string;
  mentorEmail: string | null;
  location: string;
  maximumUsers: number;
  reference: string;
  weeklyPlans: string[];
  conditions: string;
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
  typescript: "amber",
};

export type studyResponseType = {
  timestamp: string;
  status: number;
  message: string;
};

export type { DetailStudyInterface, StudyInterface };
