import { BookMarked, Sword } from "lucide-react";
import Link from "next/link";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput;
}

export const QuestItem = ({ props }: { props: QuestItemProps }) => {
  const { quest } = props;

  return (
    <>
      <BookMarked className="m-3 h-4 w-4 shrink-0"></BookMarked>
      <p className="truncate">{quest.name}</p>
    </>
  );
};
