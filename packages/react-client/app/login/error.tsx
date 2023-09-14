"use client";

import { Button } from "@/components/ui/button";

const LoginError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <section className="flex flex-col w-64">
      <h2 className="font-bold text-2xl">Error</h2>
      <p className="text-xl text-stone-500">{error.message}</p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </section>
  );
};

export default LoginError;
