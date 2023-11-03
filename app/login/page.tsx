import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <a href="/login/github">
        <Button>
          <Github className="mr-2 h-4 w-4" />
          Connect with github
        </Button>
      </a>
    </div>
  );
}

export default LoginPage;
