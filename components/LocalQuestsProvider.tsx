"use client";

import { getLocalQuests } from "@/lib/local/getLocalQuests";
import { Quest } from "@/types/Quest";
import { createContext, useContext, useEffect, useState } from "react";

export const LocalQuestsContext = createContext<Quest[] | null>(null);

export function LocalQuestsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [localQuests, setLocalQuests] = useState<Quest[] | null>(null);

  useEffect(() => {
    setLocalQuests(getLocalQuests());

    const listener = () => {
      setLocalQuests(getLocalQuests());
    };

    window.addEventListener("local-storage", listener);

    return () => {
      window.removeEventListener("local-storage", listener);
    };
  }, []);

  return (
    <LocalQuestsContext.Provider value={localQuests}>
      {children}
    </LocalQuestsContext.Provider>
  );
}

export const useLocalQuests = () => {
  const localQuests = useContext(LocalQuestsContext);
  return localQuests;
};
