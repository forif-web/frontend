import { userResponseType } from "@/app/profile/page";
import getYearAndSemester from "@/hooks/getYearAndSemester";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const { year, semester } = getYearAndSemester();
  const cookieList = cookies();
  const id_token = cookieList.get("id_token")?.value;

  if (id_token) {
    const response: Response = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
      cache: "no-cache",
    });

    const data: userResponseType = await response.json();

    const studyRes: Response = await fetch(
      `${URL}/studies?year=${year}&semester=${semester}&studyId=${data.currentStudyId}`,
      {
        method: "GET",
      }
    );
    const studyData = await studyRes.json();
    return NextResponse.json({
      userData: data,
      studyData: studyData,
    });
  } else {
    return NextResponse.json({
      message: "로그인하지 않았거나 토큰이 존재하지 않습니다.",
      status: 405,
    });
  }
}
