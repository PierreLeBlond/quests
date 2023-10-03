import { BookMarked } from "lucide-react";

export function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center w-full">
      <BookMarked className="m-3 h-4 w-4 shrink-0" />
      {children}
    </div>
  );
}
