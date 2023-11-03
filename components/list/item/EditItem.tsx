import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

type FormValues = {
  value: string;
};

type EditItemProps = {
  value: string;
  update: (value: string) => void;
};

export function EditItem({ props }: { props: EditItemProps }) {
  const { value, update } = props;
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      value,
    },
  });

  const submit = (formValues: FormValues) => {
    update(formValues.value);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex w-full items-center">
      <Settings className="m-3 h-4 w-4" />
      <Input
        {...register("value", {
          onBlur: ({ target }) => submit({ value: target.value }),
        })}
        className="mr-4"
      />
      <button type="submit" className="hidden" aria-label="submit" />
    </form>
  );
}
