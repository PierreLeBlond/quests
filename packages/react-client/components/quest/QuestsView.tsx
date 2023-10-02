"use client";

import { useEffect, useState } from "react";
import { Quest } from "@/types/Quest";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStateDispatch } from "@/state/StateProvider";
import { saveQuests } from "@/actions/saveQuests";
import { QuestItem } from "./items/QuestItem";
import { EditMode } from "./editMode";
import { QuestMenu } from "./QuestMenu";
import { QuestReorderItem } from "./items/QuestReorderItem";
import { QuestDeleteItem } from "./items/QuestDeleteItem";
import { QuestEditItem } from "./items/QuestEditItem";
import { QuestCreateItem } from "./items/QuestCreateItem";
import { ReorderArea } from "./ReorderArea";

type QuestsViewProps = {
  quests: Quest[];
}

type QuestField = {
  name: string;
  questId?: string;
}

export function QuestsView({ props }: { props: QuestsViewProps }) {
  const { quests } = props;

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
    quests: QuestField[];
  }>({
    defaultValues: {
      quests: quests.map(({ name, id }) => ({ name, questId: id })),
    },
  });
  const { fields, update, move, remove, prepend } = useFieldArray<{
    quests: QuestField[];
  }>({
    control,
    name: "quests",
  });

  useEffect(() => {
    dispatch({ type: isDirty ? 'change' : 'restore' });
  }, [dispatch, isDirty])

  useEffect(() => {
    reset({ quests: quests.map(({ name, id }) => ({ name, questId: id })) });
  }, [reset, quests]);

  const save = async () => {
    if (!isDirty) {
      return;
    }
    dispatch({ type: "submit" });
    await saveQuests({ quests: fields });
    dispatch({ type: "succeed" });
    setTimeout(() => dispatch({ type: "reset" }), 1000);
  }

  return (
    <>
      <QuestMenu props={{ editMode, setEditMode, save }} />
      <div className="pt-32 w-full">
        <QuestCreateItem props={{ editMode, prepend: (name: string) => prepend({ name }) }} />
        <ReorderArea props={{ active: editMode === "reorder", setGrabbedPosition, ids: fields.map(({ id }) => id), setGrabbedId, grabbedId, move }} >
          <ul
            className="flex flex-col relative w-full"
          >
            {fields.map(({ id, name, questId }, index) => (
              <li key={id} className="flex items-center">
                {editMode === "open" && <QuestItem props={{ name }} />}
                {editMode === "reorder" && (
                  <QuestReorderItem props={{ name, grabbed: id === grabbedId, grabbedPosition }} />
                )}
                {editMode === "delete" && (
                  <QuestDeleteItem
                    props={{ name, remove: () => remove(index) }}
                  />
                )}
                {editMode === "edit" && (
                  <QuestEditItem
                    props={{
                      name,
                      update: (updatedName: string) => update(index, { name: updatedName, questId })
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </ReorderArea>
      </div >
    </>
  );
}
