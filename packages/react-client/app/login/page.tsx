import { Github } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { eden } from "@/lib/eden";

function LoginPage() {
  const connect = async () => {
    "use server";

    const { data, error } = await eden.login.github.get();

    if (!data) {
      throw new Error(error?.message);
    }

    cookies().set("github_oauth_state", data.state, {
      maxAge: 60 * 60,
    });
    redirect(data.url);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form action={connect}>
        <Button>
          <Github className="h-4 w-4 mr-2" />
          Connect with github
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
