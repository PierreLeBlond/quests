"use client";

import { Reducer, useEffect, useReducer, useRef, useState } from "react";
import { BookMarked, Grip, Settings, Swords } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { Quest } from "@/types/Quest";
import { QuestItem } from "./QuestItem";
import { EditMode } from "./editMode";
import { QuestMenu } from "./QuestMenu";
import { QuestReorderItem } from "./QuestReorderItem";
import { QuestDeleteItem } from "./QuestDeleteItem";
import { QuestEditItem } from "./QuestEditItem";
import { QuestFormInput } from "./QuestFormInput";
import { submit } from "./submit";
import { QuestCreateItem } from "./QuestCreateItem";

const ITEM_HEIGHT = 40;

interface QuestsViewProps {
  quests: Quest[];
}

type FormStateName = "idle" | "dirty" | "submitting" | "submitted" | "failed";
type FormState = {
  name: FormStateName;
  label: string;
};
type FormActionType =
  | "change"
  | "restore"
  | "submit"
  | "succeed"
  | "fail"
  | "reset";
type FormAction = {
  type: FormActionType;
};

const formStateReducerMap = new Map<
  { name: FormStateName; type: FormActionType },
  FormState
>([
  [
    { name: "idle", type: "change" },
    { name: "dirty", label: "save?" },
  ],
  [
    { name: "dirty", type: "restore" },
    { name: "idle", label: "" },
  ],
  [
    { name: "dirty", type: "submit" },
    { name: "submitting", label: "saving..." },
  ],
  [
    { name: "submitting", type: "succeed" },
    { name: "submitted", label: "saved!" },
  ],
  [
    { name: "submitting", type: "fail" },
    { name: "failed", label: "failed!" },
  ],
  [
    { name: "submitted", type: "change" },
    { name: "dirty", label: "save?" },
  ],
  [
    { name: "failed", type: "change" },
    { name: "dirty", label: "save?" },
  ],
  [
    { name: "submitted", type: "reset" },
    { name: "idle", label: "" },
  ],
  [
    { name: "failed", type: "reset" },
    { name: "idle", label: "" },
  ],
]);

const formStateReducer = (state: FormState, action: FormAction) => {
  const foundKey = Array.from(formStateReducerMap.keys()).find(
    (key) => key.name === state.name && key.type === action.type,
  );
  if (!foundKey) {
    return state;
  }
  const value = formStateReducerMap.get(foundKey);
  if (!value) {
    return state;
  }
  return {
    ...value,
  };
};

export function QuestsView({ props }: { props: QuestsViewProps }) {
  const { quests } = props;

  const [grabbedQuest, setGrabbedQuest] = useState<
    (QuestFormInput & { id: string }) | null
  >(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);
  const [scrollStart, setScrollStart] = useState<number>(0);
  const [clientYStart, setclientYStart] = useState<number>(0);
  const [editMode, setEditMode] = useState<EditMode>("open");

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [formState, dispatchFormAction] = useReducer<
    Reducer<FormState, FormAction>
  >(formStateReducer, {
    name: "idle",
    label: "",
  });

  const {
    formState: { isDirty },
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<{
    quests: QuestFormInput[];
  }>({
    defaultValues: {
      quests: quests.map(({ name, id }) => ({ name, questId: id })),
    },
  });
  const { fields, update, move, remove, prepend } = useFieldArray<{
    quests: QuestFormInput[];
  }>({
    control,
    name: "quests",
  });

  useEffect(() => {
    dispatchFormAction({ type: isDirty ? "change" : "restore" });
  }, [isDirty]);

  const grab = (clientY: number) => {
    if (editMode !== "reorder") {
      return;
    }

    if (!scrollAreaRef.current) {
      return;
    }

    const position = clientY - scrollAreaRef.current.offsetTop;

    if (position < 0 || position > scrollAreaRef.current.offsetHeight) {
      return;
    }

    const scrolledPosition = position + scrollAreaRef.current.scrollTop;
    setGrabbedPosition(scrolledPosition);

    const index = Math.floor(scrolledPosition / ITEM_HEIGHT);

    const quest = fields.at(index);

    if (!quest) {
      return;
    }

    setGrabbedQuest(quest);
  };

  const handlePointerMove = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    const position = clientY - scrollAreaRef.current.offsetTop;

    if (position < 0 || position > scrollAreaRef.current.offsetHeight) {
      return;
    }

    const scrolledPosition = position + scrollAreaRef.current.scrollTop;
    setGrabbedPosition(scrolledPosition);

    if (!grabbedQuest) {
      return;
    }

    const toIndex = Math.floor(scrolledPosition / ITEM_HEIGHT);
    const fromIndex = fields.findIndex((quest) => quest.id === grabbedQuest.id);

    if (toIndex === fromIndex) {
      return;
    }

    move(fromIndex, toIndex);
  };

  const startScroll = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    setScrollStart(scrollAreaRef.current.scrollTop);
    setclientYStart(clientY);
  };

  const scroll = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    const clientYDiff = clientY - clientYStart;
    scrollAreaRef.current.scrollBy(0, scrollStart - clientYDiff);
  };

  return (
    <>
      <QuestMenu props={{ editMode, setEditMode, formState }} />
      <div className="flex items-center pb-4 pt-32 w-full">
        {editMode === "open" && (
          <BookMarked className="m-3 h-4 w-4 text-stone-500" />
        )}
        {editMode === "reorder" && (
          <Grip className="m-3 h-4 w-4 text-stone-500" />
        )}
        {editMode === "delete" && (
          <Swords className="m-3 h-4 w-4 text-stone-500" />
        )}
        {editMode === "edit" && (
          <Settings className="m-3 h-4 w-4 text-stone-500" />
        )}
        <QuestCreateItem props={{ prepend }} />
      </div>
      <div
        onPointerDown={(event) =>
          event.isPrimary ? grab(event.clientY) : startScroll(event.clientY)
        }
        onPointerMove={(event) =>
          event.isPrimary
            ? handlePointerMove(event.clientY)
            : scroll(event.clientY)
        }
        onPointerUp={(event) => event.isPrimary && setGrabbedQuest(null)}
        onContextMenu={(event) => event.preventDefault()}
        className={`${
          editMode === "reorder" && "touch-none"
        } w-full overflow-y-auto pb-4`}
        ref={scrollAreaRef}
      >
        <form
          onSubmit={handleSubmit(async (data) => {
            if (formState.name !== "dirty") {
              return;
            }
            dispatchFormAction({ type: "submit" });
            await submit({ questFormInputs: data.quests });
            reset({ quests: fields });
            dispatchFormAction({ type: "succeed" });
            setTimeout(() => dispatchFormAction({ type: "reset" }), 1000);
          })}
          id="questsForm"
          className="w-full"
        >
          <ul
            className={`${
              editMode === "reorder" && "select-none"
            } flex flex-col relative w-full`}
          >
            {fields.map((quest, index) => (
              <>
                <li
                  key={quest.id}
                  className={`${
                    quest.id === grabbedQuest?.id &&
                    "absolute bg-white dark:bg-black w-full rounded-md shadow-md border"
                  } flex items-center`}
                  style={{ top: grabbedPosition - ITEM_HEIGHT * 0.5 }}
                >
                  {editMode === "open" && <QuestItem props={{ quest }} />}
                  {editMode === "reorder" && (
                    <QuestReorderItem props={{ quest, grabbedQuest }} />
                  )}
                  {editMode === "delete" && (
                    <QuestDeleteItem
                      props={{ quest, remove: () => remove(index) }}
                    />
                  )}
                  {editMode === "edit" && (
                    <QuestEditItem
                      props={{
                        quest,
                        update,
                        register,
                        index,
                      }}
                    />
                  )}
                </li>
                {quest.id === grabbedQuest?.id && (
                  <li key={0} className="h-10 w-full" />
                )}
              </>
            ))}
          </ul>
        </form>
      </div>
    </>
  );
}
