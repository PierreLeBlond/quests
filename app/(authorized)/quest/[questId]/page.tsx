"use server";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as context from "next/headers";
import { saveSteps } from "@/actions/saveSteps";
import { Steps } from "@/components/list/Steps";
import { auth } from "@/lucia/lucia";
import prisma from "@/prisma/prisma";

const StepsPage = async ({ params }: { params: { questId: string } }) => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    redirect("/login");
  }
  const quest = await prisma.quest.findUniqueOrThrow({
    where: {
      id: params.questId,
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
  });

  return (
    <>
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quest</h1>
      <Link
        href="/quests"
        className="fixed left-0 top-20 z-10 p-2"
        scroll={false}
      >
        <ArrowLeft className="h-8 w-8" />
      </Link>
      <main className="relative flex w-full flex-col items-center pt-10">
        <Steps props={{ quest, saveAction: saveSteps }} />
      </main>
    </>
  );
};

export default StepsPage;
