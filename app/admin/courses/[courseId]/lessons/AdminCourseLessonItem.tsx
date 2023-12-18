import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AdminLessonItemtype } from "./admin-courseLessons.query";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/ui/loader";

export type AdminCourseLessonItemProps = {
  lesson: AdminLessonItemtype;
  isPending: boolean;
};

export default function AdminCourseLessonItem({
  lesson,
  isPending,
}: AdminCourseLessonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div className="p-1">
        <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 rounded p-2 hover:bg-accent"
          >
            <Typography variant="large" className="flex-1">
              {lesson.name}
            </Typography>
            <Badge>{lesson.state}</Badge>
            <div
              onClickCapture={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Button
                variant="secondary"
                size="icon"
                className="cursor-move"
                disabled={isPending}
                {...listeners}
              >
                {isPending ? <Loader size={16} /> : <Menu size={16} />}
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
