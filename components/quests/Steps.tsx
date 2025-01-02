"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStateDispatch } from "@/state/StateProvider";
import { Quest } from "@/types/Quest";
import { EditMode } from "./editMode";
import { ReorderArea } from "./ReorderArea";
import { EditMenu } from "./menu/EditMenu";
import { CreateItem } from "./item/CreateItem";
import { Item } from "./item/Item";
import { ReorderItem } from "./item/ReorderItem";
import { DeleteItem } from "./item/DeleteItem";
import { EditItem } from "./item/EditItem";
import { Step } from "@/types/Step";
import { type SaveStepsAction } from "@/actions/saveSteps";

type StepsProps = {
  quest: Quest;
  saveSteps: SaveStepsAction;
};

type StepField = {
  description: string;
  done: boolean;
  stepId?: string;
};

type StepFieldWithId = StepField & { id: string };

export function Steps({ props }: { props: StepsProps }) {
  // Lifted up states
  const [grabbedId, setGrabbedId] = useState<string | null>(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);
  const [editMode, setEditMode] = useState<EditMode>("open");

  const [quest, setQuest] = useState<Quest>(props.quest);

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

  const dispatch = useAppStateDispatch();

  const [saving, setSaving] = useState(false);

  const cancelSave = saving || grabbedId !== null;

  // Db is kept in sync with actual fields values
  const save = async () => {
    if (cancelSave) {
      return;
    }

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

    // Let's keep a copy of the current fields to properly match new ids latter
    const currentFields = fields.slice(0);

    setSaving(true);
    dispatch({ type: "submit" });
    const response = await props.saveSteps({
      ...quest,
      steps: fields.map((step, index) => ({
        description: step.description,
        done: step.done,
        index,
        id: step.stepId,
      })),
    });

    if (
      !response ||
      !response.data ||
      response.validationErrors ||
      response.serverError
    ) {
      dispatch({ type: "fail" });
      return;
    }

    dispatch({ type: "succeed" });
    setSaving(false);

    setQuest(response.data);

    response.data.steps.forEach((step: Step, index: number) => {
      const oldField = currentFields.at(index) as StepFieldWithId;
      const field = fields.find(
        ({ id }) => id === oldField.id,
      ) as StepFieldWithId;
      update(index, {
        ...field,
        stepId: step.id,
      });
    });
  };

  useEffect(() => {
    save();
  });

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
