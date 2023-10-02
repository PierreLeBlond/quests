import { Grip } from "lucide-react";

interface QuestItemProps {
  name: string;
  grabbed: boolean;
  grabbedPosition: number;
}

export function QuestReorderItem({ props }: { props: QuestItemProps }) {
  const { name, grabbed, grabbedPosition } = props;

  return (
    <>
      <div
        className={`${grabbed &&
          "absolute bg-white dark:bg-black w-full rounded-md shadow-md border"
          } flex items-center`}
        style={{ top: grabbedPosition }}
      >
        <div
          className={`${grabbed ? "cursor-grabbing" : "cursor-grab"
            } flex items-center w-full`}
        >
          <Grip className="m-3 h-4 w-4 shrink-0" />
          <p className="truncate">{name}</p>
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
