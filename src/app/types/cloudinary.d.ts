type CloudinaryRes = {
  access_mode: string;
  created_at: string;
  format: string;
  public_id: string;
  url: string;
  width: number;
  height: number;
};

type CloudinaryURIType = {
  profileImg: File;
  studentId: string;
};

export type { CloudinaryRes, CloudinaryURIType };
