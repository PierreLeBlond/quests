import { getUser } from "@/lib/getUser";

const HomePage = async () => {
  const user = await getUser();

  return (
    <section className="flex flex-col">
      <h1 className="text-3xl font-bold">Hello</h1>
      <p className="text-stone-500 text-xl">{user?.githubUsername}</p>
    </section>
  );
};

export default HomePage;
