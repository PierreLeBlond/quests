import { getUser } from "./getUser";
import { getUserQuests } from "./user/getUserQuests";

export const getQuests = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return getUserQuests(user);
};
