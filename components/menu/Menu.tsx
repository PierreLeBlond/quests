import { DoorOpen, Key, MoreVertical } from "lucide-react";
import { redirect } from "next/navigation";
import * as context from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { getUser } from "@/lib/getUser";
import { auth } from "@/lucia/lucia";
import { ThemeSwitch } from "./ThemeSwitch";
import Link from "next/link";

const Menu = async () => {
  const logout = async () => {
    "use server";

    const sessionId = auth.readSessionCookie("auth_session=abc");
    const { session } = sessionId
      ? await auth.validateSession(sessionId)
      : { session: null };
    if (session) {
      // make sure to invalidate the current session!
      await auth.invalidateSession(session.id);
      // delete session cookie
      const sessionCookie = auth.createBlankSessionCookie();

      const cookies = await context.cookies();
      cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    redirect("/login");
  };

  const user = await getUser();

  const logoutItem = user && (
    <>
      <DropdownMenuItem>
        <form action={logout} className="w-full">
          <button
            type="submit"
            className="flex w-full items-center justify-center"
          >
            Log out
            <DoorOpen className="ml-2 h-4 w-4" />
          </button>
        </form>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );

  const loginItem = !user && (
    <>
      <DropdownMenuItem>
        <Link className="flex w-full items-center justify-center" href="/login">
          Log in
          <Key className="ml-2 h-4 w-4" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );

  return (
    <nav className="fixed top-0 right-2 z-10 flex p-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {logoutItem}
          {loginItem}
          <DropdownMenuItem>
            <ThemeSwitch />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Menu;
