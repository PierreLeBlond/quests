import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, MoreVertical } from "lucide-react";
import { eden, fetchHeaders } from "@/lib/eden";
import { redirect } from "next/navigation";
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
          <button className="flex justify-center w-full">
            Log out
            <DoorOpen className="w-4 h-4 ml-2"></DoorOpen>
          </button>
        </form>
      </DropdownMenuItem>
      <DropdownMenuSeparator></DropdownMenuSeparator>
    </>
  );

  return (
    <>
      <nav className="fixed right-0 top-0 p-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-6 h-6"></MoreVertical>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {logoutItem}
            <DropdownMenuItem>
              <ThemeSwitch></ThemeSwitch>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default Menu;
