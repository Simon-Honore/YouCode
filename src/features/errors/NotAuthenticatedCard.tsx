import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, Home } from "lucide-react";
import React from "react";
import LoginButton from "../auth/LoginButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotAuthenticatedCard() {
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
