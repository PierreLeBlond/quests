import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

const AuthorizedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <main className="flex items-center justify-center">{children}</main>
      <nav className="fixed bottom-0 w-full bg-stone-900 h-20"></nav>
    </>
  );
};

export default AuthorizedLayout;
