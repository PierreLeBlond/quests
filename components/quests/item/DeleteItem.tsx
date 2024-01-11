import { Swords } from "lucide-react";

type ItemProps = {
  remove: () => void;
};

export function DeleteItem({
  props,
  children,
}: {
  props: ItemProps;
  children: React.ReactNode;
}) {
  const { remove } = props;

  return (
    <div className="relative flex w-full items-center">
      <Swords
        className="m-3 h-4 w-4 shrink-0 cursor-pointer text-rose-500"
        onClick={remove}
      />
      {children}
    </div>
  );
}
