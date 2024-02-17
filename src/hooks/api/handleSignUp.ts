import { signUpSchema } from "@/lib/default_form";
import z from "zod";

interface signUpDataType extends z.infer<typeof signUpSchema> {
  id_token: string | undefined;
}

const handleSignUp = async (userData: signUpDataType) => {
  const URL = `${process.env.API_BASEURL}:${process.env.API_BASEPORT}`;
  const data: Response = await fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userData.id_token}`,
    },
    body: JSON.stringify({
      username: userData.username,
      userId: userData.userId,
      department: userData.department,
      phoneNumber: userData.phoneNumber,
    }),
    cache: "no-cache",
  });
  return data;
};

export default handleSignUp;
