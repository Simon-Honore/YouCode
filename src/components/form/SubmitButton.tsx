"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={pending} />;
}
