"use client";

import { useMounted } from "@/hooks/useMounted";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const { mounted } = useMounted();

  if (!mounted) {
    return null;
  }

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const item =
    theme === "light" ? (
      <>
        Light <Sun className="w-4 h-4 ml-2"></Sun>
      </>
    ) : (
      <>
        Dark <Moon className="w-4 h-4 ml-2"></Moon>
      </>
    );

  return (
    <div className="flex w-full justify-center" onClick={switchTheme}>
      {item}
    </div>
  );
};
