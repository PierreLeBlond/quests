"use server";

import * as context from "next/headers";
import { redirect } from "next/navigation";
import { Quests } from "@/components/list/Quests";
import { saveQuests } from "@/actions/saveQuests";
import { auth } from "@/lucia/lucia";
import prisma from "@/prisma/prisma";

const QuestsPage = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    redirect("/login");
  }
  const quests = await prisma.quest.findMany({
    where: {
      user: {
        id: session.user.userId,
      },
    },
    include: {
      steps: {
        orderBy: {
          index: "asc",
        },
      },
    },
    orderBy: {
      index: "asc",
    },
  });

  return (
    <>
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quests</h1>
      <main className="relative flex w-full flex-col items-center pt-10">
        <Quests props={{ quests, saveAction: saveQuests }} />
      </main>
    </>
  );
};

export default QuestsPage;
