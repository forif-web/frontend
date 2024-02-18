import getToken from "@/hooks/api/getToken";
import { signUpSchema } from "@/lib/default_form";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const idToken = await getToken({ req });
  const payload: z.infer<typeof signUpSchema> = await req.json();

  if (idToken) {
    const response: Response = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
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
  } else {
    return NextResponse.json({
      message: "로그인하지 않았거나 토큰이 존재하지 않습니다.",
      status: 405,
    });
  }
}
