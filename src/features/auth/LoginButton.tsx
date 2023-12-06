"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginButton({ ...props }: ButtonProps) {
  const loginMutation = useMutation({
    mutationFn: async () => signIn(),
  });

  return (
    <Button
      onClick={() => {
        loginMutation.mutate();
      }}
      disabled={loginMutation.isPending}
      {...props}
    >
      {loginMutation.isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogIn className="mr-2 h-4 w-4" />
      )}
      Se connecter
    </Button>
  );
}
