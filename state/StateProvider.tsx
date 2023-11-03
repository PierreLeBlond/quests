"use client";

import React, { createContext, useReducer, Dispatch, useContext } from "react";

type StateName = "idle" | "submitting" | "submitted" | "failed";
type State = {
  name: StateName;
};
type ActionType = "submit" | "succeed" | "fail" | "reset";
type Action = {
  type: ActionType;
};

const stateReducerMap = new Map<{ name: StateName; type: ActionType }, State>([
  [{ name: "idle", type: "submit" }, { name: "submitting" }],
  [{ name: "submitting", type: "succeed" }, { name: "submitted" }],
  [{ name: "submitting", type: "fail" }, { name: "failed" }],
  [{ name: "submitted", type: "submit" }, { name: "submitting" }],
  [{ name: "failed", type: "submit" }, { name: "submitting" }],
  [{ name: "submitted", type: "reset" }, { name: "idle" }],
  [{ name: "failed", type: "reset" }, { name: "idle" }],
]);

export const stateReducer = (state: State, action: Action) => {
  const foundKey = Array.from(stateReducerMap.keys()).find(
    (key) => key.name === state.name && key.type === action.type,
  );
  if (!foundKey) {
    return state;
  }
  const value = stateReducerMap.get(foundKey);
  if (!value) {
    return state;
  }
  return {
    ...value,
  };
};

export const StateContext = createContext<State | null>(null);
export const StateDispatchContext = createContext<Dispatch<Action> | null>(
  null,
);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, { name: "idle" });

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useAppState = () => {
  const state = useContext(StateContext);
  if (!state) {
    throw new Error("State context is null");
  }
  return state;
};

export const useAppStateDispatch = () => {
  const stateDispatch = useContext(StateDispatchContext);
  if (!stateDispatch) {
    throw new Error("State dispatch context is null");
  }
  return stateDispatch;
};
