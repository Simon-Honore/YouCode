"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "@/features/auth/LoginButton";
import { AlertOctagon, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <Card className="m-auto mt-10 max-w-xl">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <AlertOctagon />
        <CardTitle>
          Vous devez être connecté pour accéder à cette page
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <LoginButton size="lg" />
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/"
        >
          <Home className="mr-2 h-4 w-4" />
          Accueil
        </Link>
      </CardContent>
    </Card>
  );
}
