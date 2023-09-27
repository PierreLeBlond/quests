import { eden, fetchHeaders } from "./eden";

export const getUser = async () => {
  const { data } = await eden.user.get(fetchHeaders());

  return data?.user;
};
