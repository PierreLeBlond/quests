import * as context from "next/headers";
import { auth } from "@/lucia/lucia";

export const getUser = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  return session?.user;
};
