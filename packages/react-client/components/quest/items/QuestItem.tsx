import { BookMarked } from "lucide-react";

interface QuestItemProps {
  name: string;
}

export function QuestItem({ props }: { props: QuestItemProps }) {
  const { name } = props;

  return (
    <>
      <BookMarked className="m-3 h-4 w-4 shrink-0" />
      <p className="truncate">{name}</p>
    </>
  );
}
