import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
export async function GET(req: NextRequest, res: NextResponse) {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const session = await getServerSession(authOptions);

  if (session && session.user.token) {
    const response: Response = await fetch(`${URL}/apply/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.token.id_token}`,
        "Cache-Control": "no-store",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        message: data.message,
        status: 404,
      });
    }
  } else {
    return NextResponse.json({
      message: "NO TOKEN",
      status: 500,
    });
  }
}
