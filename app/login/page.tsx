import { Github, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginPage() {
  return (
    <div className="relative flex h-full w-48 flex-col items-center justify-center gap-y-4">
      <h1 className="pb-16 text-3xl font-bold">QUESTS</h1>
      <a href="/login/github" className="w-full">
        <Button className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Connect with github
        </Button>
      </a>
      <div className="flex w-full items-center justify-center gap-x-4">
        <p className="grow rounded-full border border-black dark:border-white" />
        <p>or</p>
        <p className="grow rounded-full border border-black dark:border-white" />
      </div>
      <a href="/quests" className="w-full">
        <Button className="w-full">
          <HardDrive className="mr-2 h-4 w-4" />
          Use local storage
        </Button>
      </a>
    </div>
  );
}

export default LoginPage;
