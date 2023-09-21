import { Flame, Grip, Settings, Swords } from "lucide-react";
import { EditMode } from "./editMode";
import { Toggle } from "../ui/toggle";

type FormStateName = "idle" | "dirty" | "submitting" | "submitted" | "failed";
type FormState = {
  name: FormStateName;
  label: string;
};

interface QuestMenuProps {
  editMode: EditMode;
  setEditMode: (editMode: EditMode) => void;
  formState: FormState;
}

export const QuestMenu = ({ props }: { props: QuestMenuProps }) => {
  const { editMode, setEditMode, formState } = props;
  return (
    <div className="flex justify-center">
      <div className="absolute grid grid-cols-3">
        <button
          type="submit"
          form="questsForm"
          className="relative col-start-2 row-start-1 p-3 cursor-pointer"
        >
          <div className="absolute text-sm text-justify left-4 bottom-8 flex flex-col">
            {formState.label}
            {formState.label !== "" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="12"
                stroke-width="1"
                fill="none"
                viewBox="0 0 40 12"
                className="stroke-current"
              >
                <path d="m 0,0 5,0 5,8 5,-8 h 25" />
              </svg>
            )}
          </div>
          <Flame
            className={`h-4 w-4 ${
              formState.name == "dirty" && "text-orange-500"
            } ${formState.name == "submitting" && "text-rose-500"}`}
          ></Flame>
        </button>
        <Toggle
          onPressedChange={(pressed) =>
            pressed ? setEditMode("reorder") : setEditMode("open")
          }
          pressed={editMode === "reorder"}
          className="col-start-1 row-start-2"
        >
          <Grip className="h-4 w-4"></Grip>
        </Toggle>
        <Toggle
          onPressedChange={(pressed) =>
            pressed ? setEditMode("edit") : setEditMode("open")
          }
          pressed={editMode === "edit"}
          className="col-start-3 row-start-2"
        >
          <Settings className="h-4 w-4"></Settings>
        </Toggle>
        <Toggle
          onPressedChange={(pressed) =>
            pressed ? setEditMode("delete") : setEditMode("open")
          }
          pressed={editMode === "delete"}
          className="col-start-2 row-start-3"
        >
          <Swords className="h-4 w-4"></Swords>
        </Toggle>
      </div>
    </div>
  );
};
