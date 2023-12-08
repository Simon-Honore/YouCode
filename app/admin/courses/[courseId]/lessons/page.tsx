import { getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { getCourseLessons } from "./courseLessons.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import CourseLessonItem from "./CourseLessonItem";

export default async function CoursesLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { user } = await getRequiredAuthSession();

  const lessons = await getCourseLessons({
    courseId: params.courseId,
    userId: user.id,
  });

  if (!lessons) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Leçons du cours : {lessons[0].course.name}</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Card>
          <CardContent className="flex flex-col divide-y-2 px-8 py-4">
            {lessons.map((lesson) => (
              <CourseLessonItem key={lesson.id} lesson={lesson} />
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}