import { Swords } from "lucide-react";

type ItemProps = {
  remove: () => void;
}

export function DeleteItem({ props, children }: { props: ItemProps, children: React.ReactNode }) {
  const { remove } = props;

  return (
    <div className="relative flex items-center w-full">
      <Swords
        className="m-3 h-4 w-4 text-rose-500 cursor-pointer shrink-0"
        onClick={remove}
      />
      {children}
    </div>
  );
}
