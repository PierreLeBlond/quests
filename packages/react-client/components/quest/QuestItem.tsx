import { BookMarked } from "lucide-react";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput;
}

export function QuestItem({ props }: { props: QuestItemProps }) {
  const { quest } = props;

  return (
    <>
      <BookMarked className="m-3 h-4 w-4 shrink-0" />
      <p className="truncate">{quest.name}</p>
    </>
  );
}
