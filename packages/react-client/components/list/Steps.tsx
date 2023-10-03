"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStateDispatch } from "@/state/StateProvider";
import { saveSteps } from "@/actions/saveSteps";
import { Quest } from "@/types/Quest";
import { createStep } from "@/actions/createStep";
import { EditMode } from "./editMode";
import { ReorderArea } from "./ReorderArea";
import { EditMenu } from "./EditMenu";
import { CreateItem } from "./item/CreateItem";
import { Item } from "./item/Item";
import { ReorderItem } from "./item/ReorderItem";
import { DeleteItem } from "./item/DeleteItem";
import { EditItem } from "./item/EditItem";

type StepsProps = {
  quest: Quest;
}

type StepField = {
  description: string;
  done: boolean;
  stepId: string;
}

export function Steps({ props }: { props: StepsProps }) {
  const { quest } = props;

  const [grabbedId, setGrabbedId] = useState<
    string | null
  >(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);

  const [editMode, setEditMode] = useState<EditMode>("open");

  const dispatch = useAppStateDispatch();

  const {
    formState: { isDirty },
    control,
    reset,
  } = useForm<{
    steps: StepField[];
  }>({
    defaultValues: {
      steps: quest.steps.map(({ description, done, id }) => ({ description, done, stepId: id })),
    },
  });
  const { fields, update, move, remove } = useFieldArray<{
    steps: StepField[];
  }>({
    control,
    name: "steps",
  });

  useEffect(() => {
    dispatch({ type: isDirty ? 'change' : 'restore' });
  }, [dispatch, isDirty])

  useEffect(() => {
    reset({ steps: quest.steps.map(({ description, done, id }) => ({ description, done, stepId: id })) });
  }, [reset, quest.steps]);

  const save = async () => {
    if (!isDirty) {
      return;
    }
    dispatch({ type: "submit" });
    await saveSteps({ steps: fields, questId: quest.id });
    dispatch({ type: "succeed" });
    setTimeout(() => dispatch({ type: "reset" }), 1000);
  }

  const create = async (value: string) => {
    dispatch({ type: "submit" });
    await createStep({ description: value, index: 0, done: false, questId: quest.id });
    dispatch({ type: "succeed" });
    setTimeout(() => dispatch({ type: "reset" }), 1000);
  }

  return (
    <>
      <EditMenu props={{ editMode, setEditMode, save }} />
      <div className="pt-32 w-full">
        <p className="text-sm text-stone-500 p-4 font-bold truncate">{quest.name}</p>
        <CreateItem props={{ editMode, placeholder: "new step", create }} />
        <ReorderArea props={{ active: editMode === "reorder", setGrabbedPosition, ids: fields.map(({ id }) => id), setGrabbedId, grabbedId, move }} >
          <ul
            className="flex flex-col relative w-full"
          >
            {fields.map(({ id, done, description, stepId }, index) => {
              const item = (
                <p className="truncate">{description}</p>
              );
              return (<li key={id} className={`${done && "line-through text-stone-500"} flex items-center w-full`}>
                {editMode === "open" && (
                  <button type="button" onClick={() => update(index, { description, done: !done, stepId })} className="flex items-center w-full">
                    <Item>{item}</Item>
                  </button>
                )}
                {editMode === "reorder" && (
                  <ReorderItem props={{ grabbed: id === grabbedId, grabbedPosition }}>{item}</ReorderItem>
                )}
                {editMode === "delete" && (
                  <DeleteItem props={{ remove: () => remove(index) }}>{item}</DeleteItem>
                )}
                {editMode === "edit" && (
                  <EditItem
                    props={{
                      value: description,
                      update: (value: string) => update(index, { description: value, done, stepId })
                    }}
                  />
                )}
              </li>
              )
            })}
          </ul>
        </ReorderArea>
      </div >
    </>
  );
}
