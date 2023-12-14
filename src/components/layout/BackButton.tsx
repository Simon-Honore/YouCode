"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        router.back();
      }}
      size="icon"
    >
      <ArrowLeft className="h-6 w-6 stroke-muted-foreground" />
    </Button>
  );
}
