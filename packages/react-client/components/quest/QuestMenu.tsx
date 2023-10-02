import { Flame, Grip, Settings, Swords } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useAppState } from "@/state/StateProvider";
import { EditMode } from "./editMode";

interface QuestMenuProps {
  editMode: EditMode;
  setEditMode: (editMode: EditMode) => void;
  save: () => Promise<void>;
}

export function QuestMenu({ props }: { props: QuestMenuProps }) {
  const { editMode, setEditMode, save } = props;
  const state = useAppState();

  return (
    <div className="flex justify-center">
      <div className="absolute grid grid-cols-3">
        <button
          type="button"
          onClick={save}
          className="relative col-start-2 row-start-1 p-3 cursor-pointer"
        >
          <div className="absolute text-sm text-justify left-4 bottom-8 flex flex-col">
            {state.label}
            {state.label !== "" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="12"
                strokeWidth="1"
                fill="none"
                viewBox="0 0 40 12"
                className="stroke-current"
              >
                <path d="m 0,0 5,0 5,8 5,-8 h 25" />
              </svg>
            )}
          </div>
          <Flame
            className={`h-4 w-4 ${state.name === "dirty" && "text-orange-500"
              } ${state.name === "submitting" && "text-rose-500"}`}
          />
        </button>
        <Toggle
          pressed={editMode === "reorder"}
          onPressedChange={(pressed) =>
            pressed ? setEditMode("reorder") : setEditMode("open")
          }
          className="col-start-1 row-start-2"
        >
          <Grip className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editMode === "edit"}
          onPressedChange={(pressed) =>
            pressed ? setEditMode("edit") : setEditMode("open")
          }
          className="col-start-3 row-start-2"
        >
          <Settings className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editMode === "delete"}
          onPressedChange={(pressed) =>
            pressed ? setEditMode("delete") : setEditMode("open")
          }
          className="col-start-2 row-start-3"
        >
          <Swords className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
}
