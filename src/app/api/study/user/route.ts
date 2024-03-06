import { userResponseType } from "@/app/types/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
export async function GET(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const session = await getServerSession(authOptions);
  if (session) {
    const response: Response = await fetch(`${URL}/studies/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.token.id_token}`,
      },
      cache: "no-cache",
    });

    const data: userResponseType = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "로그인하지 않았거나 토큰이 존재하지 않습니다.",
      status: 405,
    });
  }
}
