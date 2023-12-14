import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AdminPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin/courses"
        >
          Mes cours
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin/courses/create"
        >
          Créer un cours
        </Link>
      </LayoutContent>
    </Layout>
  );
}
