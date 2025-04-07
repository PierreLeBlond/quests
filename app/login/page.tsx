import { Github, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="relative flex h-full w-48 flex-col items-center justify-center gap-y-4">
      <h1 className="pb-16 text-3xl font-bold">QUESTS</h1>
      <Link href="/login/github" className="w-full">
        <Button className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Connect with github
        </Button>
      </Link>
      <div className="flex w-full items-center justify-center gap-x-4">
        <p className="grow rounded-full border border-black dark:border-white" />
        <p>or</p>
        <p className="grow rounded-full border border-black dark:border-white" />
      </div>
      <Link href="/quests" className="w-full">
        <Button className="w-full">
          <HardDrive className="mr-2 h-4 w-4" />
          Use local storage
        </Button>
      </Link>
    </div>
  );
}

export default LoginPage;
