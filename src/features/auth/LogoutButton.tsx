"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const logoutMutation = useMutation({
    mutationFn: async () => signOut({ callbackUrl: "/" }),
  });

  return (
    <Button
      variant="outline"
      onClick={() => {
        logoutMutation.mutate();
      }}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Se déconnecter
    </Button>
  );
}
