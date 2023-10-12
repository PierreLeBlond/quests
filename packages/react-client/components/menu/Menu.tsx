import { DoorOpen, MoreVertical } from "lucide-react";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { eden, fetchHeaders } from "@/lib/eden";
import { getUser } from "@/lib/getUser";
import { ThemeSwitch } from "./ThemeSwitch";

const Menu = async () => {
  const logout = async () => {
    "use server";

    await eden.logout.post(fetchHeaders());
    redirect("/login");
  };

  const user = await getUser();

  const logoutItem = user && (
    <>
      <DropdownMenuItem>
        <form action={logout} className="w-full">
          <button type="submit" className="flex w-full justify-center">
            Log out
            <DoorOpen className="ml-2 h-4 w-4" />
          </button>
        </form>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );

  return (
    <nav className="fixed right-2 top-0 z-10 flex p-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {logoutItem}
          <DropdownMenuItem>
            <ThemeSwitch />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Menu;
