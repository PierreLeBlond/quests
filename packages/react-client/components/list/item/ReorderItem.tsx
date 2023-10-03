import { Grip } from "lucide-react";

interface ItemProps {
  grabbed: boolean;
  grabbedPosition: number;
}

export function ReorderItem({ props, children }: { props: ItemProps, children: React.ReactNode }) {
  const { grabbed, grabbedPosition } = props;

  return (
    <>
      <div
        className={`${grabbed &&
          "absolute bg-white dark:bg-black rounded-md shadow-md border"
          } flex items-center w-full`}
        style={{ top: grabbedPosition }}
      >
        <div
          className={`${grabbed ? "cursor-grabbing" : "cursor-grab"
            } flex items-center w-full relative`}
        >
          <Grip className="m-3 h-4 w-4 shrink-0" />
          {children}
        </div>
      </div>
      {
        grabbed && (
          <div key="grabbed-item" className="h-10 w-full" />
        )
      }
    </>
  );
}
