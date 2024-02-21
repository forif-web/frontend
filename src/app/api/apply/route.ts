import getToken from "@/hooks/api/getToken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const idToken = await getToken({ req });
  const payload = await req.json();

  const response: Response = await fetch(`${URL}/apply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "응답이 올바르지 않습니다.",
      status: 404,
    });
  }
}
