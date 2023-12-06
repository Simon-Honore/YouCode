import React from "react";
import LoginButton from "./LoginButton";
import LoggedInButton from "./LoggedInButton";
import { getAuthSession } from "@/lib/auth";

export default async function AuthButton() {
  const session = await getAuthSession();

  if (!session) {
    return <LoginButton />;
  }

  const user = session.user;

  return <LoggedInButton user={user} />;
}
