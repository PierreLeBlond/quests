"use server";

import { eden } from "@/lib/eden";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async () => {
  const { data, error } = await eden.login.github.get();

  if (!data) {
    throw new Error(error?.message);
  }

  cookies().set("github_oauth_state", data.state, {
    maxAge: 60 * 60,
  });
  redirect(data.url);
};
