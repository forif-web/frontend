export type applyDataType = {
  id: number;
  name: string;
  career: string | "없음";
  intro: string;
  phoneNumber: string;
};

export type ApplicationType = {
  primaryStudy: string;
  primaryIntro: string;
  secondaryStudy: string;
  secondaryIntro: string;
  career: string;
};

export type mentorApplyType = {
  first: applyDataType[];
  second: applyDataType[];
};
