import { BookMarked, Grip, Plus, Settings, Swords } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditMode } from "../editMode";

type FormValues = {
  name: string;
};

type QuestCreateItemProps = {
  editMode: EditMode | null;
  prepend: (name: string) => void;
}

export function QuestCreateItem({ props }: { props: QuestCreateItemProps }) {
  const { editMode, prepend } = props;
  const {
    handleSubmit,
    formState: { isDirty },
    register,
    reset
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const submit = async ({ name }: FormValues) => {
    prepend(name);
    reset();
  }

  return (
    <div className="flex items-center pb-4 w-full">
      {
        editMode === "open" && (
          <BookMarked className="m-3 h-4 w-4 text-stone-500" />
        )
      }
      {
        editMode === "reorder" && (
          <Grip className="m-3 h-4 w-4 text-stone-500" />
        )
      }
      {
        editMode === "delete" && (
          <Swords className="m-3 h-4 w-4 text-stone-500" />
        )
      }
      {
        editMode === "edit" && (
          <Settings className="m-3 h-4 w-4 text-stone-500" />
        )
      }
      <form onSubmit={handleSubmit(submit)} className="flex w-full">
        <Input placeholder="new quest" {...register("name")} />
        <button type="submit">
          <Plus className={`m-3 h-4 w-4 ${isDirty || "text-stone-500"}`} />
        </button>
      </form>
    </div >
  );
}
