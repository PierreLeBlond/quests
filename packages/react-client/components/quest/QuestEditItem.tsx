import { Settings } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput;
  update: (index: number, quest: QuestFormInput) => void;
  register: UseFormRegister<{ quests: QuestFormInput[] }>;
  index: number;
}

export function QuestEditItem({ props }: { props: QuestItemProps }) {
  const { quest, update, register, index } = props;

  return (
    <>
      <Settings className="m-3 h-4 w-4" />
      <Input
        className="mr-4"
        defaultValue={quest.name}
        {...register(`quests.${index}.name`, {
          onBlur: ({ target }: { target: HTMLInputElement }) =>
            update(index, { ...quest, name: target.value }),
        })}
      />
    </>
  );
}
