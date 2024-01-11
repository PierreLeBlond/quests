import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppState, useAppStateDispatch } from "@/state/StateProvider";

const STATE_LABEL = new Map([
  ["submitting", "saving..."],
  ["submitted", "saved!"],
  ["failed", "failed..."],
]);

export function StateCue() {
  const state = useAppState();
  const dispatch = useAppStateDispatch();

  const [idle, setIdle] = useState(false);

  const label = idle ? null : STATE_LABEL.get(state.name);

  useEffect((): (() => void) => {
    if (state.name !== "submitted") {
      setIdle(false);
      return () => {};
    }

    const timeoutId = window.setTimeout(() => {
      setIdle(true);
      dispatch({ type: "reset" });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [state.name, dispatch]);

  return (
    <>
      <div className="absolute bottom-8 left-4 flex flex-col text-justify text-sm">
        {label}
        {label && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="12"
            strokeWidth="1"
            fill="none"
            viewBox="0 0 40 12"
            className="stroke-current"
          >
            <path d="m 0,0 5,0 5,8 5,-8 h 25" />
          </svg>
        )}
      </div>
      <Flame className={`h-4 w-4 ${label && "text-orange-500"}`} />
    </>
  );
}
