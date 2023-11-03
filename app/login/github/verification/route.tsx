import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { auth, githubAuth } from "@/lucia/lucia";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const storedState = cookies().get("github_oauth_state")?.value;

  if (!storedState || !state || storedState !== state || !code) {
    throw new Error("Github OAuth url invalide");
  }

  const { getExistingUser, githubUser, createUser } =
    await githubAuth.validateCallback(code);
  const getUser = async () => {
    const existingUser = await getExistingUser();
    if (existingUser) return existingUser;
    const user = await createUser({
      attributes: {
        github_username: githubUser.login,
      },
    });
    return user;
  };

  const user = await getUser();
  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });
  const authRequest = auth.handleRequest(request.method, {
    cookies,
    headers,
  });
  authRequest.setSession(session);

  redirect("/");
};
