import { redirect } from "next/navigation";

const HomePage = async () => {
  redirect("/quests");
};

export default HomePage;
