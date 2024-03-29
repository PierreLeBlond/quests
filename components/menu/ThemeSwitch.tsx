"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const { mounted } = useMounted();

  if (!mounted) {
    return null;
  }

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const item =
    theme === "dark" ? (
      <div className="flex items-center">
        Light <Sun className="ml-2 h-4 w-4" />
      </div>
    ) : (
      <div className="flex items-center">
        Dark <Moon className="ml-2 h-4 w-4" />
      </div>
    );

  return (
    <button
      type="button"
      className="flex w-full justify-center"
      onClick={switchTheme}
      onKeyDown={switchTheme}
    >
      {item}
    </button>
  );
}
