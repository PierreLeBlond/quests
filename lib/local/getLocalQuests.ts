import { Quest } from "@/types/Quest";

export const getLocalQuests = (): Quest[] => {
  const serializedQuests = localStorage.getItem("quests");
  return serializedQuests
    ? JSON.parse(serializedQuests).sort(
        (a: Quest, b: Quest) => a.index - b.index,
      )
    : [];
};
