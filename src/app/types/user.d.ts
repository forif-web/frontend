export type User = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
};

export type getUserResponseType = {
  userData: userResponseType;
  studyData: StudyInterface;
  applyData: applyDataType;
};

export type userResponseType = {
  currentStudyId: number | string;
  department: string;
  email: string;
  image: string;
  passedStudyId: number[];
  phoneNumber: string;
  userId: number;
  userName: string;
};
