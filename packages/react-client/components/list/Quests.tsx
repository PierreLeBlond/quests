"use client";

import { useEffect, useState } from "react";
import { Quest } from "@/types/Quest";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppStateDispatch } from "@/state/StateProvider";
import { saveQuests } from "@/actions/saveQuests";
import Link from "next/link";
import { Item } from "./item/Item";
import { EditMode } from "./editMode";
import { EditMenu } from "./EditMenu";
import { ReorderItem } from "./item/ReorderItem";
import { DeleteItem } from "./item/DeleteItem";
import { EditItem } from "./item/EditItem";
import { CreateItem } from "./item/CreateItem";
import { ReorderArea } from "./ReorderArea";

type QuestsProps = {
  quests: Quest[];
}

type QuestField = {
  name: string;
  questId?: string;
}

export function Quests({ props }: { props: QuestsProps }) {
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
      quests: quests.map(({ name, id, steps }) => ({ name, questId: id, steps })),
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
    reset({ quests: quests.map(({ name, id, steps }) => ({ name, questId: id, steps })) });
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
      <EditMenu props={{ editMode, setEditMode, save }} />
      <div className="pt-32 w-full">
        <CreateItem props={{ editMode, placeholder: "new quest", prepend: (value: string) => prepend({ name: value }) }} />
        <ReorderArea props={{ active: editMode === "reorder", setGrabbedPosition, ids: fields.map(({ id }) => id), setGrabbedId, grabbedId, move }} >
          <ul
            className="flex flex-col relative w-full"
          >
            {fields.map(({ id, name, questId }, index) => {
              const quest = quests.find(currentQuest => currentQuest.id === questId) as Quest;
              const steps = quest ? quest.steps : [];
              const doneSteps = quest ? quest.steps.filter(step => step.done) : [];
              const done = steps.length > 0 && steps.length === doneSteps.length;
              return (
                <li key={id} className={`${done && "line-through text-stone-500"} relative flex items-center w-full`}>
                  {steps.length > 0 && (
                    <>
                      <div className="absolute flex bottom-0 h-0.5 w-full pl-10 pr-10">
                        <div className="bg-stone-500 h-0.5" style={{ width: `${(doneSteps.length / steps.length) * 100}%` }} />
                        <div className="bg-stone-500/50 h-0.5" style={{ width: `${(1.0 - doneSteps.length / steps.length) * 100}%` }} />
                      </div>
                      <p className="absolute right-10 bottom-0 text-stone-500 text-xs">{doneSteps.length}/{steps.length}</p>
                    </>
                  )}
                  {editMode === "open" && (
                    <Link href={`quest/${questId}`} className="flex items-center w-full" scroll={false}>
                      <Item props={{ value: name }} />
                    </Link>
                  )}
                  {editMode === "reorder" && (
                    <ReorderItem props={{ value: name, grabbed: id === grabbedId, grabbedPosition }} />
                  )}
                  {editMode === "delete" && (
                    <DeleteItem
                      props={{ value: name, remove: () => remove(index) }}
                    />
                  )}
                  {editMode === "edit" && (
                    <EditItem
                      props={{
                        value: name,
                        update: (value: string) => update(index, { name: value, questId })
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
