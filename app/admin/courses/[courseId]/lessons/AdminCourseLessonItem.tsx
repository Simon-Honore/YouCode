import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { Lesson } from "@prisma/client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GetAdminCourseLessons } from "./admin-courseLessons.query";

export type AdminCourseLessonItemProps = {
  lesson: GetAdminCourseLessons[number];
};

// export default function AdminCourseLessonItem({
//   lesson,
// }: AdminCourseLessonItemProps) {
//   return (
//     <div className="p-1">
//       <div className="flex items-center justify-between rounded p-2 hover:bg-accent">
//         <Typography variant="large">{lesson.name}</Typography>
//         <Badge>{lesson.state}</Badge>
//       </div>
//     </div>
//   );
// }

export default function AdminCourseLessonItem({
  lesson,
}: AdminCourseLessonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="p-1">
        <div className="flex items-center justify-between rounded p-2 hover:bg-accent">
          <Typography variant="large">{lesson.name}</Typography>
          <Badge>{lesson.state}</Badge>
        </div>
      </div>
    </div>
  );
}
