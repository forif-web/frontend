type MilestoneEvent = {
  id: number;
  event: string;
  imgUrl: string;
};

type MilestoneEvents = {
  month: string;
  details: MilestoneEvent[];
};

type MilestoneData = {
  year: number;
  events: MilestoneEvents[];
};

type MilestoneType = {
  data: MilestoneData[];
};

export type { MilestoneEvent, MilestoneType };
