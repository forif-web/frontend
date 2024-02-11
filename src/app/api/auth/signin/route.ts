import getToken from "@/hooks/api/getToken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const idToken = await getToken({ req });

  if (idToken) {
    const response: Response = await fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
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
  } else {
    return NextResponse.json({
      message: "로그인하지 않았거나 토큰이 존재하지 않습니다.",
      status: 405,
    });
  }
}
