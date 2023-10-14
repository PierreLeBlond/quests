import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/login";

function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <form action={login}>
        <Button>
          <Github className="mr-2 h-4 w-4" />
          Connect with github
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
