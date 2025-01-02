"use server";

import { Quests } from "@/components/quests/Quests";
import { getQuests } from "@/lib/getQuests";
import { getUser } from "@/lib/getUser";
import { LocalQuests } from "@/components/quests/LocalQuests";
import { saveQuests } from "@/actions/saveQuests";

const QuestsPage = async () => {
  const user = await getUser();
  const quests = await getQuests();

  return (
    <>
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quests</h1>
      <h2 className="fixed left-0 top-8 p-2 text-xs text-stone-500">
        {user ? user.username : "Local"}
      </h2>
      <main className="relative flex w-full flex-col items-center pt-10">
        {!quests ? <LocalQuests /> : <Quests props={{ quests, saveQuests }} />}
      </main>
    </>
  );
};

export default QuestsPage;
