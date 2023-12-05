import React from "react";
import LoginButton from "./LoginButton";
import LoggedInButton from "./LoggedInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export default async function AuthButton() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginButton />;
  }

  const user = session.user;

  return <LoggedInButton user={user} />;
}
