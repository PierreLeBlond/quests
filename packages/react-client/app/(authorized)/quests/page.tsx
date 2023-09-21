import { QuestsView } from "@/components/quest/QuestsView";
import { eden, fetchHeaders } from "@/lib/eden";

const QuestsPage = async () => {
  const { data, error } = await eden.quests.get(fetchHeaders());

  if (!data) {
    throw new Error(error?.message);
  }

  return (
    <>
      <h1 className="fixed top-0 left-0 text-3xl font-bold p-2">Quests</h1>
      <main className="pt-10 flex flex-col w-full items-center">
        <QuestsView props={{ quests: data }}></QuestsView>
      </main>
    </>
  );
};

export default QuestsPage;
