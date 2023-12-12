import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { Lesson } from "@prisma/client";
import React from "react";

export type AdminCourseLessonItemProps = {
  lesson: Partial<Lesson>;
};

export default function AdminCourseLessonItem({
  lesson,
}: AdminCourseLessonItemProps) {
  return (
    <div className="p-1">
      <div className="flex items-center justify-between rounded p-2 hover:bg-accent">
        <Typography variant="large">{lesson.name}</Typography>
        <Badge variant="secondary">{lesson.state}</Badge>
      </div>
    </div>
  );
}
