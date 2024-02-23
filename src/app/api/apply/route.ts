import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
export async function POST(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const session = await getServerSession(authOptions);
  const payload = await req.json();
  console.log(session?.user.token.id_token);

  const response: Response = await fetch(`${URL}/apply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (response.ok) {
    return NextResponse.json(data);
  } else {
    console.error(data);

    return NextResponse.json({
      message: data.message,
      status: 404,
    });
  }
}
