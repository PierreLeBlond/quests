import { eden, fetchHeaders } from "@/lib/eden";
import { Quests } from "@/components/list/Quests";

const QuestsPage = async () => {
  const { data, error } = await eden.quests.get(fetchHeaders());

  if (!data) {
    throw new Error(error?.message);
  }

  return (
    <>
      <h1 className="fixed top-0 left-0 text-3xl font-bold p-2">Quests</h1>
      <main className="pt-10 flex flex-col w-full items-center">
        <Quests props={{ quests: data }} />
      </main>
    </>
  );
};

export default QuestsPage;
