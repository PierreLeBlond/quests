import { redirect } from "next/navigation";
import { getUser } from "@/lib/getUser";

const AuthorizedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <main className="flex w-full justify-center">{children}</main>;
};

export default AuthorizedLayout;
