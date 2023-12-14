import BackButton from "@/components/layout/BackButton";
import Breadcrumb from "@/components/layout/Breadcrumb";
import React, { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto max-w-3xl">
      <div className="flex w-full items-center gap-6 py-4">
        <BackButton />
        <Breadcrumb />
      </div>
      {children}
    </div>
  );
}
