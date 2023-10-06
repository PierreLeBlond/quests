import { useEffect, useRef } from "react";

export const useAutosave = (save: () => Promise<void>, active: boolean) => {
  const saving = useRef<boolean>(false);

  useEffect(() => {
    if (saving.current || !active) {
      return;
    }

    saving.current = true;
    save().then(() => {
      saving.current = false;
    });
  }, [save, active]); // eslint-disable-line
}