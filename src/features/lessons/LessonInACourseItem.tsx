import React from "react";
import { LessonInACourse } from "@/../app/courses/[courseId]/course.query";
import { Typography } from "@/components/ui/typography";
import { CheckCircle, CircleDot, CircleDotDashed } from "lucide-react";

export type LessonsInACourseItemProps = {
  lesson: LessonInACourse;
};

export default function LessonInACourseItem({
  lesson,
}: LessonsInACourseItemProps) {
  const lessonProgressIcon = (progress: LessonInACourse["progress"]) => {
    if (progress === "NOT_STARTED") {
      return <CircleDotDashed className="stroke-muted-foreground" />;
    }

    if (progress === "IN_PROGRESS") {
      return <CircleDot className="stroke-sky-600" />;
    }

    return <CheckCircle className="stroke-emerald-600" />;
  };

  return (
    <div className="p-1">
      <div className="flex items-center gap-2 rounded p-2 hover:bg-accent">
        {lessonProgressIcon(lesson.progress)}
        <Typography variant="base">{lesson.name}</Typography>
      </div>
    </div>
  );
}
