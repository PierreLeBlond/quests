"use server";

import { Steps } from "../../../../components/quests/Steps";
import { LocalSteps } from "../../../../components/quests/LocalSteps";
import { getQuest } from "../../../../lib/getQuest";
import { getUser } from "../../../../lib/getUser";
import { saveSteps } from "../../../../actions/saveSteps";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const StepsPage = async ({
  params,
}: {
  params: Promise<{ questId: string }>;
}) => {
  const { questId } = await params;
  const user = await getUser();
  const quest = await getQuest(questId);

  return (
    <>
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quest</h1>
      <h2 className="fixed left-0 top-8 p-2 text-xs text-stone-500">
        {user ? user.username : "Local"}
      </h2>
      <Link
        href="/quests"
        className="fixed left-0 top-20 z-10 p-2"
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
