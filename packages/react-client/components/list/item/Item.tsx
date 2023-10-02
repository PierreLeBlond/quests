import { BookMarked } from "lucide-react";

interface ItemProps {
  value: string;
}

export function Item({ props }: { props: ItemProps }) {
  const { value } = props;

  return (
    <>
      <BookMarked className="m-3 h-4 w-4 shrink-0" />
      <p className="truncate">{value}</p>
    </>
  );
}
