import { Swords } from "lucide-react";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput;
  remove: () => void;
}

export const QuestDeleteItem = ({ props }: { props: QuestItemProps }) => {
  const { quest, remove } = props;

  return (
    <>
      <Swords
        className="m-3 h-4 w-4 text-rose-500 cursor-pointer shrink-0"
        onClick={() => remove()}
      ></Swords>
      <p className="truncate">{quest.name}</p>
    </>
  );
};
