import getToken from "@/hooks/api/getToken";
import { formSchema } from "@/lib/default_form";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { authOptions } from "../[...nextauth]/options";
export async function PATCH(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const session = await getServerSession(authOptions);
  const idToken = await getToken({ req });

  const payload: z.infer<typeof formSchema> = await req.json();
  if (idToken) {
    const response: Response = await fetch(`${URL}/user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-cache",
    });
    const data = await response.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({
      message: "로그인하지 않았거나 토큰이 존재하지 않습니다.",
      status: 405,
    });
  }
}
