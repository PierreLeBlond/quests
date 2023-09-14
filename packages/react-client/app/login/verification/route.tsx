import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eden } from "@/lib/eden";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const storedState = cookies().get("github_oauth_state")?.value;

  if (!storedState || !state || storedState !== state || !code) {
    throw new Error("Github OAuth url invalide");
  }

  const { data, error } = await eden.login.github.callback.post({
    code,
  });

  if (!data) {
    throw new Error(error?.message);
  }

  const { session } = data;

  cookies().set("token", session.sessionId, {
    httpOnly: true,
    path: "/",
  });

  redirect("/");
};
