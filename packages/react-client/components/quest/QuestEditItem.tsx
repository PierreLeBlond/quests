import { Settings } from "lucide-react";
import { Input } from "../ui/input";
import { UseFormRegister } from "react-hook-form";
import { QuestFormInput } from "./QuestFormInput";

interface QuestItemProps {
  quest: QuestFormInput;
  update: (index: number, quest: QuestFormInput) => void;
  register: UseFormRegister<{ quests: QuestFormInput[] }>;
  index: number;
}

export const QuestEditItem = ({ props }: { props: QuestItemProps }) => {
  const { quest, update, register, index } = props;

  return (
    <>
      <Settings className="m-3 h-4 w-4"></Settings>
      <Input
        className="mr-4"
        defaultValue={quest.name}
        {...(register(`quests.${index}.name`),
        {
          onBlur: ({ target }: { target: HTMLInputElement }) =>
            update(index, { ...quest, name: target.value }),
        })}
      ></Input>
    </>
  );
};
