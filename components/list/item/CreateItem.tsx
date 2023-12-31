import { BookMarked, Grip, Plus, Settings, Swords } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditMode } from "../editMode";

type FormValues = {
  value: string;
};

type CreateItemProps = {
  editMode: EditMode | null;
  placeholder: string;
  prepend: (value: string) => void;
};

export function CreateItem({ props }: { props: CreateItemProps }) {
  const { editMode, placeholder, prepend } = props;
  const {
    handleSubmit,
    formState: { isDirty },
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      value: "",
    },
  });

  const submit = ({ value }: FormValues) => {
    reset();
    prepend(value);
  };

  return (
    <div className="flex w-full items-center pb-4">
      {editMode === "open" && (
        <BookMarked className="m-3 h-4 w-4 text-stone-500" />
      )}
      {editMode === "reorder" && (
        <Grip className="m-3 h-4 w-4 text-stone-500" />
      )}
      {editMode === "delete" && (
        <Swords className="m-3 h-4 w-4 text-stone-500" />
      )}
      {editMode === "edit" && (
        <Settings className="m-3 h-4 w-4 text-stone-500" />
      )}
      <form onSubmit={handleSubmit(submit)} className="flex w-full">
        <Input placeholder={placeholder || "new item"} {...register("value")} />
        <button type="submit" aria-label="Create item">
          <Plus className={`m-3 h-4 w-4 ${isDirty || "text-stone-500"}`} />
        </button>
      </form>
    </div>
  );
}
