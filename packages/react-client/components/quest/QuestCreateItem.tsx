import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { QuestFormInput } from "./QuestFormInput";

type QuestCreateItemProps = {
  prepend: (questFormInput: QuestFormInput) => void;
};

type FormValues = {
  name: string;
};

export const QuestCreateItem = ({ props }: { props: QuestCreateItemProps }) => {
  const { prepend } = props;
  const {
    handleSubmit,
    formState: { isDirty },
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = ({ name }: FormValues) => {
    if (name == "") {
      return;
    }

    prepend({ name });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
      <Input placeholder="new quest" {...register("name")}></Input>
      <button type="submit">
        <Plus className={`m-3 h-4 w-4 ${isDirty || "text-stone-500"}`}></Plus>
      </button>
    </form>
  );
};
