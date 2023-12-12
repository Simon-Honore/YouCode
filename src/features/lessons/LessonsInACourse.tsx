import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import LessonInACourseItem from "./LessonInACourseItem";
import { CourseDetails } from "../../../app/courses/[courseId]/course.query";

export default function LessonsInACourse({
  lessons,
}: {
  lessons: CourseDetails["lessons"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground">Leçons</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {lessons.map((lesson) => (
          <LessonInACourseItem key={lesson.id} lesson={lesson} />
        ))}
      </CardContent>
    </Card>
  );
}
