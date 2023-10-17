"use client";

import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStateDispatch } from "@/state/StateProvider";
import type { saveSteps } from "@/actions/saveSteps";
import { Quest } from "@/types/Quest";
import { useAutosave } from "@/hooks/useAutosave";
import { EditMode } from "./editMode";
import { ReorderArea } from "./ReorderArea";
import { EditMenu } from "./menu/EditMenu";
import { CreateItem } from "./item/CreateItem";
import { Item } from "./item/Item";
import { ReorderItem } from "./item/ReorderItem";
import { DeleteItem } from "./item/DeleteItem";
import { EditItem } from "./item/EditItem";

type StepsProps = {
  quest: Quest;
  saveAction: typeof saveSteps;
};

type StepField = {
  description: string;
  done: boolean;
  stepId?: string;
};

type StepFieldWithId = StepField & { id: string };

export function Steps({ props }: { props: StepsProps }) {
  const { quest, saveAction } = props;

  const [grabbedId, setGrabbedId] = useState<string | null>(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);

  const [editMode, setEditMode] = useState<EditMode>("open");

  const dispatch = useAppStateDispatch();

  const { control } = useForm<{
    steps: StepField[];
  }>({
    defaultValues: {
      steps: quest.steps.map(({ description, done, id }) => ({
        description,
        done,
        stepId: id,
      })),
    },
  });
  const { fields, update, move, remove, prepend } = useFieldArray<{
    steps: StepField[];
  }>({
    control,
    name: "steps",
  });

  // Db is kept in sync with actual fields values
  const save = useCallback(async () => {
    if (quest.steps.length === fields.length) {
      const match = quest.steps.every((step, index) => {
        const field = fields.at(index);
        if (!field) {
          return false;
        }
        return (
          step.description === field.description &&
          step.done === field.done &&
          (!field.stepId || field.stepId === step.id)
        );
      });
      if (match) {
        return;
      }
    }

    dispatch({ type: "submit" });
    const { data, validationError, serverError } = await saveAction({
      steps: fields,
      questId: quest.id,
    });

    if (validationError || serverError) {
      dispatch({ type: "fail" });
    }

    if (data) {
      dispatch({ type: "succeed" });
      data.forEach((newStep) => {
        const index = fields.findIndex((field) => field.id === newStep.id);
        const field = fields.at(index) as StepFieldWithId;
        update(index, {
          ...field,
          stepId: newStep.stepId,
        });
      });
    }
  }, [quest, fields, dispatch, update, saveAction]);

  useAutosave(save, grabbedId === null);

  return (
    <>
      <EditMenu props={{ editMode, setEditMode }} />
      <div className="flex h-full w-full flex-col pt-32">
        <p className="truncate p-4 text-sm font-bold text-stone-500">
          {quest.name}
        </p>
        <CreateItem
          props={{
            editMode,
            placeholder: "new step",
            prepend: (value: string) =>
              prepend({ description: value, done: false }),
          }}
        />
        <ReorderArea
          props={{
            active: editMode === "reorder",
            setGrabbedPosition,
            ids: fields.map(({ id }) => id),
            setGrabbedId,
            grabbedId,
            move,
          }}
        >
          <ul className="relative flex w-full flex-col">
            {fields.map(({ id, done, description, stepId }, index) => {
              const item = <p className="truncate">{description}</p>;
              return (
                <li
                  key={id}
                  className={`${
                    done && "text-stone-500 line-through"
                  } flex w-full items-center`}
                >
                  {editMode === "open" && (
                    <button
                      type="button"
                      onClick={() =>
                        update(index, { description, done: !done, stepId })
                      }
                      className="flex w-full items-center"
                    >
                      <Item>{item}</Item>
                    </button>
                  )}
                  {editMode === "reorder" && (
                    <ReorderItem
                      props={{ grabbed: id === grabbedId, grabbedPosition }}
                    >
                      {item}
                    </ReorderItem>
                  )}
                  {editMode === "delete" && (
                    <DeleteItem props={{ remove: () => remove(index) }}>
                      {item}
                    </DeleteItem>
                  )}
                  {editMode === "edit" && (
                    <EditItem
                      props={{
                        value: description,
                        update: (value: string) =>
                          update(index, { description: value, done, stepId }),
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </ReorderArea>
      </div>
    </>
  );
}
