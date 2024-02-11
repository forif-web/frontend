type MilestoneEvent = {
  event: string;
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

export type { MilestoneType };
