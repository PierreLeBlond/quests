import { getUser } from "./getUser";
import { getUserQuest } from "./user/getUserQuest";

export const getQuest = async (questId: string) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return getUserQuest(user, questId);
};
