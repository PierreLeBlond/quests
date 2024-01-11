import { Grip } from "lucide-react";

type ItemProps = {
  grabbed: boolean;
  grabbedPosition: number;
};

export function ReorderItem({
  props,
  children,
}: {
  props: ItemProps;
  children: React.ReactNode;
}) {
  const { grabbed, grabbedPosition } = props;

  return (
    <>
      <div
        className={`${
          grabbed &&
          "absolute rounded-md border bg-white shadow-md dark:bg-black"
        } flex w-full items-center`}
        style={{ top: grabbedPosition }}
      >
        <div
          className={`${
            grabbed ? "cursor-grabbing" : "cursor-grab"
          } relative flex w-full items-center`}
        >
          <Grip className="m-3 h-4 w-4 shrink-0" />
          {children}
        </div>
      </div>
      {grabbed && <div key="grabbed-item" className="h-10 w-full" />}
    </>
  );
}
