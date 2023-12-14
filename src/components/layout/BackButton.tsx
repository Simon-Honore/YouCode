"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft className="mr-2 h-6 w-6" />
      Back
    </Button>
  );
}
