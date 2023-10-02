import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

interface QuestItemProps {
  name: string;
  update: (name: string) => void;
}

export function QuestEditItem({ props }: { props: QuestItemProps }) {
  const { name, update } = props;

  const handleBlur = ({ target }: { target: HTMLInputElement }) => {
    update(target.value);
  }

  return (
    <>
      <Settings className="m-3 h-4 w-4" />
      <Input
        autoComplete="off"
        name="name"
        className="mr-4"
        defaultValue={name}
        onBlur={handleBlur}
      />
    </>
  );
}