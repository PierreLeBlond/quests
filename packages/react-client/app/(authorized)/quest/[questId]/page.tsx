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
      <h1 className="fixed left-0 top-0 p-2 text-3xl font-bold">Quest</h1>
      <Link
        href="/quests"
        className="fixed left-0 top-20 z-10 p-2"
        scroll={false}
      >
        <ArrowLeft className="h-8 w-8" />
      </Link>
      <main className="relative flex w-full flex-col items-center pt-10">
        <Steps props={{ quest: data }} />
      </main>
    </>
  );
};

export default StepsPage;
