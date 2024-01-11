import { Quest } from "@/types/Quest";

export const saveLocalQuests = (quests: Quest[]) => {
  localStorage.setItem("quests", JSON.stringify(quests));
  window.dispatchEvent(new Event("local-storage"));
};
