"use server";

import { Steps } from "@/components/quests/Steps";
import { LocalSteps } from "@/components/quests/LocalSteps";
import { getUser } from "@/lib/getUser";
import { saveSteps } from "@/actions/saveSteps";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getUserQuest } from "@/lib/user/getUserQuest";

const StepsPage = async ({
  params,
}: {
  params: Promise<{ questId: string }>;
}) => {
  const { questId } = await params;
  const user = await getUser();
  const quest = user ? await getUserQuest(user, questId) : null;

  return (
    <>
      <h1 className="fixed top-0 left-0 p-2 text-3xl font-bold">Quest</h1>
      <h2 className="fixed top-8 left-0 p-2 text-xs text-stone-500">
        {user ? user.username : "Local"}
      </h2>
      <Link
        href="/quests"
        className="fixed top-20 left-0 z-10 p-2"
        scroll={false}
      >
        <ArrowLeft className="h-8 w-8" />
      </Link>
      <main className="relative flex w-full flex-col items-center pt-10">
        {!quest ? (
          <LocalSteps props={{ questId }} />
        ) : (
          <Steps props={{ quest, saveSteps }} />
        )}
      </main>
    </>
  );
};

export default StepsPage;
