import { userResponseType } from "@/app/profile/page";
import getYearAndSemester from "@/hooks/getYearAndSemester";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/options";
export async function GET(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const { year, semester } = getYearAndSemester();
  const session = await getServerSession(authOptions);

  if (session) {
    const response: Response = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.token.id_token}`,
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
