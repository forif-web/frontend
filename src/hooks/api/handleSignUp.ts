type signUpType = {
  id_token: string | undefined;
  username: string;
  userId: string;
  department: string;
};

const handleSignUp = async (userData: signUpType) => {
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
    }),
    cache: "default",
  });
  return data;
};

export default handleSignUp;
