import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const response: Response = await fetch(`${URL}/apply/payment`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user.token.id_token}`,
    },
    cache: "no-store",
  });

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

export async function PATCH(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const session = await getServerSession(authOptions);

  const payload = await req.json();

  if (session && session.user.token) {
    const response: Response = await fetch(`${URL}/apply/paid`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.user.token.id_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        message: data.message,
        status: data.status,
      });
    }
  } else {
    return NextResponse.json({
      messsage: "NO TOKEN",
      status: 404,
    });
  }
}
