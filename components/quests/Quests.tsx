"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Link from "next/link";
import { SafeAction } from "next-safe-action";
import { Quest } from "@/types/Quest";
import { useAppStateDispatch } from "@/state/StateProvider";
import { questsInputsSchema } from "@/lib/schema/questsInputsSchema";
import { Item } from "./item/Item";
import { EditMode } from "./editMode";
import { EditMenu } from "./menu/EditMenu";
import { ReorderItem } from "./item/ReorderItem";
import { DeleteItem } from "./item/DeleteItem";
import { EditItem } from "./item/EditItem";
import { CreateItem } from "./item/CreateItem";
import { ReorderArea } from "./ReorderArea";

type QuestsProps = {
  quests: Quest[];
  saveQuests: SafeAction<typeof questsInputsSchema, Quest[]>;
};

type QuestField = {
  name: string;
  questId?: string;
};
type QuestFieldWithId = QuestField & { id: string };

export function Quests({ props }: { props: QuestsProps }) {
  const { saveQuests } = props;

  // Lifted up states
  const [grabbedId, setGrabbedId] = useState<string | null>(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);
  const [editMode, setEditMode] = useState<EditMode>("open");

  const [quests, setQuests] = useState<Quest[]>(props.quests);

  // Global form state
  const { control } = useForm<{
    quests: QuestField[];
  }>({
    defaultValues: {
      quests: quests.map(({ name, id }) => ({
        name,
        questId: id,
      })),
    },
  });
  const { fields, update, move, remove, prepend } = useFieldArray<{
    quests: QuestField[];
  }>({
    control,
    name: "quests",
  });

  const dispatch = useAppStateDispatch();

  const [saving, setSaving] = useState(false);

  const cancelSave = saving || grabbedId !== null;

  // Db is kept in sync with actual fields values
  const save = async () => {
    if (cancelSave) {
      return;
    }

    if (quests.length === fields.length) {
      const match = quests.every((quest, index) => {
        const field = fields.at(index);
        if (!field) {
          return false;
        }
        return (
          quest.name === field.name &&
          (!field.questId || field.questId === quest.id)
        );
      });
      if (match) {
        return;
      }
    }

    // Let's keep a copy of the current fields to properly match new ids latter
    const currentFields = fields.slice(0);

    dispatch({ type: "submit" });
    setSaving(true);
    const { data, validationErrors, serverError } = await saveQuests(
      fields.map((field, index) => ({
        name: field.name,
        index,
        steps: quests.find((quest) => quest.id === field.questId)?.steps || [],
        id: field.questId,
      })),
    );

    if (validationErrors || serverError) {
      dispatch({ type: "fail" });
      return;
    }

    dispatch({ type: "succeed" });
    setSaving(false);

    if (!data) {
      return;
    }

    setQuests(data);

    // Add new ids to corresponding fields
    data.forEach((quest, index) => {
      const oldField = currentFields.at(index) as QuestFieldWithId;
      const field = fields.find(
        ({ id }) => id === oldField.id,
      ) as QuestFieldWithId;
      update(index, {
        ...field,
        questId: quest.id,
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
        <CreateItem
          props={{
            editMode,
            placeholder: "new quest",
            prepend: (value: string) => prepend({ name: value }),
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
            {fields.map(({ id, name, questId }, index) => {
              const quest = quests.find(
                (currentQuest) => currentQuest.id === questId,
              ) as Quest;
              const steps = quest ? quest.steps : [];
              const doneSteps = quest
                ? quest.steps.filter((step) => step.done)
                : [];
              const done =
                steps.length > 0 && steps.length === doneSteps.length;

              const item = (
                <>
                  <div className="absolute bottom-0 flex h-2 w-full gap-2 pl-10 pr-10">
                    {steps.map((step) => (
                      <div
                        className={`h-2 w-2 rounded-full ${
                          step.done
                            ? "bg-stone-500"
                            : "bg-stone-900 dark:bg-stone-100"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="truncate">{name}</p>
                </>
              );

              return (
                <li
                  key={id}
                  className={`${
                    done && "text-stone-500 line-through"
                  } flex w-full items-center`}
                >
                  {editMode === "open" && (
                    <Link
                      href={`quest/${questId}`}
                      className={`${
                        !questId && "pointer-events-none text-stone-500"
                      } flex w-full items-center`}
                      scroll={false}
                    >
                      <Item>{item}</Item>
                    </Link>
                  )}
                  {editMode === "reorder" && (
                    <ReorderItem
                      props={{ grabbed: id === grabbedId, grabbedPosition }}
                    >
                      {item}
                    </ReorderItem>
                  )}
                  {editMode === "delete" && (
                    <DeleteItem
                      props={{
                        remove: () => {
                          remove(index);
                        },
                      }}
                    >
                      {item}
                    </DeleteItem>
                  )}
                  {editMode === "edit" && (
                    <EditItem
                      props={{
                        value: name,
                        update: (value: string) => {
                          update(index, { name: value, questId });
                        },
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
