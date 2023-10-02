import { Swords } from "lucide-react";

type QuestItemProps = {
  name: string;
  remove: () => void;
}

export function QuestDeleteItem({ props }: { props: QuestItemProps }) {
  const { name, remove } = props;

  return (
    <>
      <Swords
        className="m-3 h-4 w-4 text-rose-500 cursor-pointer shrink-0"
        onClick={remove}
      />
      <p className="truncate">{name}</p>
    </>
  );
}
