import { Grip } from "lucide-react";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput & { id: string };
  grabbedQuest: (QuestFormInput & { id: string }) | null;
}

export const QuestReorderItem = ({ props }: { props: QuestItemProps }) => {
  const { quest, grabbedQuest } = props;

  return (
    <div
      className={`${
        quest.id === grabbedQuest?.id ? "cursor-grabbing" : "cursor-grab"
      } flex items-center w-full`}
    >
      <Grip className="m-3 h-4 w-4 shrink-0"></Grip>
      <p className="truncate">{quest.name}</p>
    </div>
  );
};
