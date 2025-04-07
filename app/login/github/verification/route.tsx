import * as context from "next/headers";
import { auth, githubAuth } from "@/lucia/lucia";
import prisma from "@/prisma/prisma";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

interface GitHubUser {
  id: string;
  login: string;
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const cookies = await context.cookies();
  const storedState = cookies.get("github_oauth_state")?.value;

  if (!storedState || !state || storedState !== state || !code) {
    console.log(`Github OAuth url invalide: ${storedState}, ${state}, ${code}`);
    throw new Error("Github OAuth url invalide");
  }

  try {
    const tokens = await githubAuth.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        github_username: githubUser.login,
      },
    });

    if (existingUser) {
      const session = await auth.createSession(existingUser.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}`,
        },
      });
    }

    const userId = generateIdFromEntropySize(10);

    await prisma.user.create({
      data: {
        id: userId,

        github_username: githubUser.login,
      },
    });

    const session = await auth.createSession(userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}`,
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
};
