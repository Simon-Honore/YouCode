import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Settings, UserCog } from "lucide-react";
import LogoutButton from "@/features/auth/LogoutButton";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("No session found");
  }

  const account = session.user;

  return (
    <Card className="m-auto mt-10 max-w-xl">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar className="h-14 w-14">
          <AvatarFallback>{account?.name?.[0]}</AvatarFallback>
          {account?.image && (
            <AvatarImage
              src={account?.image}
              alt={account?.name ?? "user picture"}
            />
          )}
        </Avatar>
        <div className="flex flex-col justify-around">
          <CardTitle>{account.email}</CardTitle>
          <CardDescription>{account.name}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/settings"
        >
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin"
        >
          <UserCog className="mr-2 h-4 w-4" />
          Admin
        </Link>
      </CardContent>

      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
