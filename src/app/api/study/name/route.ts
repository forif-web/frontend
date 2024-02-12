import getYearAndSemester from "@/hooks/getYearAndSemester";
import { NextRequest, NextResponse } from "next/server";

export type getStudyNamesType = {
  [key: string]: string[];
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { year, semester } = getYearAndSemester();
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const response: Response = await fetch(
    `${URL}/studies/name?year=${year}&semester=${semester}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (response.ok) {
    const data: getStudyNamesType = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "응답이 올바르지 않습니다.",
      status: 404,
    });
  }
}
