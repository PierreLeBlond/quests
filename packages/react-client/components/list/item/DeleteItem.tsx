import { Swords } from "lucide-react";

type ItemProps = {
  value: string;
  remove: () => void;
}

export function DeleteItem({ props }: { props: ItemProps }) {
  const { value, remove } = props;

  return (
    <>
      <Swords
        className="m-3 h-4 w-4 text-rose-500 cursor-pointer shrink-0"
        onClick={remove}
      />
      <p className="truncate">{value}</p>
    </>
  );
}
