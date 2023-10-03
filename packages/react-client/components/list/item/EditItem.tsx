import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EditItemProps {
  value: string;
  update: (value: string) => void;
}

export function EditItem({ props }: { props: EditItemProps }) {
  const { value, update } = props;

  const handleBlur = ({ target }: { target: HTMLInputElement }) => {
    update(target.value);
  }

  return (
    <>
      <Settings className="m-3 h-4 w-4" />
      <Input
        autoComplete="off"
        className="mr-4"
        defaultValue={value}
        onBlur={handleBlur}
      />
    </>
  );
}