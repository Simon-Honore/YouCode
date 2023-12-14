"use client";

import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();

  const paths = pathname?.slice(1).split("/");

  return (
    <nav aria-label="breadcrumb" className="flex">
      <Typography
        variant="link"
        as={Link}
        href={"/"}
        className="flex items-center text-muted-foreground"
      >
        <Home className="mx-1 h-4 w-4" />
        Home
      </Typography>

      {paths?.map((path, i) => (
        <div key={i} className="flex items-center text-muted-foreground">
          <ChevronRight className="mx-1 h-4 w-4" />
          <Typography
            variant="link"
            as={Link}
            href={`/${paths.slice(0, i + 1).join("/")}`}
            className="text-muted-foreground"
          >
            {path.length > 11
              ? path.slice(0, 2) + "..." + path.slice(-2)
              : path}
          </Typography>
        </div>
      ))}
    </nav>
  );
}
