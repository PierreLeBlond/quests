import { cookies } from "next/headers";

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
