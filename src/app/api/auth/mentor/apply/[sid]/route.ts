import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const response: Response = await fetch(
    `${URL}/apply/all?studyId=${params.sid}`,
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
      status: 404,
    });
  }
}
