import { eden, fetchHeaders } from "@/lib/eden";
import { Quests } from "@/components/list/Quests";
import { saveQuests } from "@/actions/saveQuests";

const QuestsPage = async () => {
  const { data, error } = await eden.quests.get(fetchHeaders());

  if (!data) {
    throw new Error(error?.message);
  }

  return (
    <>
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quests</h1>
      <main className="relative flex w-full flex-col items-center pt-10">
        <Quests props={{ quests: data, saveAction: saveQuests }} />
      </main>
    </>
  );
};

export default QuestsPage;
