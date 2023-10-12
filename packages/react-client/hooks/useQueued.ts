import { useCallback, useRef } from "react";

export const useQueued = (value: (() => Promise<void>) | null) => {
  const executingValue = useRef<Promise<void> | null>(null);

  const execute = useCallback(async () => {
    if (executingValue.current) {
      await executingValue.current;
    }
    if (!value) {
      return;
    }
    const newExecutingValue = value();
    executingValue.current = newExecutingValue;
    await newExecutingValue;
    executingValue.current = null;
  }, [value]);

  return execute;
};
