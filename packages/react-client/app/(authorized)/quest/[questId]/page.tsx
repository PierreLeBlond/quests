import { Steps } from "@/components/list/Steps";
import { eden, fetchHeaders } from "@/lib/eden";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const StepsPage = async ({ params }: { params: { questId: string } }) => {
  const { data, error } = await eden.quest[params.questId].get(fetchHeaders());

  if (!data) {
    throw new Error(error?.message);
  }

  return (
    <>
      <h1 className="fixed top-0 left-0 text-3xl font-bold p-2">Quest</h1>
      <p className="fixed top-8 text-stone-500 left-0 text-2xl p-2">{data.name}</p>
      <Link href="/quests" className="fixed top-20 left-0 p-2" scroll={false}>
        <ArrowLeft className="h-8 w-8" />
      </Link>
      <main className="pt-10 flex flex-col w-full items-center">
        <Steps props={{ quest: data }} />
      </main>
    </>
  );
};

export default StepsPage;