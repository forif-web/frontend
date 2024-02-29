import getYearAndSemester from "@/hooks/getYearAndSemester";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const { year, semester } = getYearAndSemester();

  const response: Response = await fetch(
    `${URL}/studies?year=${year}&semester=${semester}&studyId=${params.sid}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "응답이 올바르지 않습니다.",
      status: 200,
    });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  const payload = await req.json();
  const response: Response = await fetch(`${URL}/studies/${params.sid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.user.token.id_token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "응답이 올바르지 않습니다.",
      status: 200,
    });
  }
}
