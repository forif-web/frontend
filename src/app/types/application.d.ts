export type applyDataType = {
  applyId: number;
  applierId: number;
  primaryStudy: string;
  primaryIntro: string;
  secondaryStudy: string | "미참여";
  secondaryIntro: string;
  career: string | "없음";
  isPaid: boolean;
  primaryStatus: string;
  secondaryStatus: string;
};
