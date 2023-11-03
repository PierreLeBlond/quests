import { Grip, Settings, Swords } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { EditMode } from "../editMode";
import { StateCue } from "./StateCue";

type EditMenuProps = {
  editMode: EditMode;
  setEditMode: (editMode: EditMode) => void;
};

export function EditMenu({ props }: { props: EditMenuProps }) {
  const { editMode, setEditMode } = props;

  return (
    <div className="flex justify-center">
      <div className="absolute grid grid-cols-3">
        <div className="relative col-start-2 row-start-1 cursor-pointer p-3">
          <StateCue />
        </div>
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
