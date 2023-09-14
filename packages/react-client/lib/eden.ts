import { edenTreaty } from "@elysiajs/eden/treaty";
import type { App } from "../../server/src";
import { cookies } from "next/headers";

export const eden = edenTreaty<App>(process.env.NEXT_PUBLIC_API_URL);
export const fetchHeaders = () => {
  const token = cookies().get("token")?.value;

  return {
    $fetch: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};
