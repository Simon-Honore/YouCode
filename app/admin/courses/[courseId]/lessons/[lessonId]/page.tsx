import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import React from "react";
import { getAdminLesson } from "./admin-lesson.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import LessonForm from "./edit/LessonForm";
import MdxEditorLesson from "./MdxEditorLesson";

export default async function AdminLessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getRequiredAuthSession();

  if (!session) {
    notFound();
  }

  const lesson = await getAdminLesson({
    lessonId: params.lessonId,
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!lesson) {
    notFound();
  }

  return (
    <Layout className="mb-6">
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex gap-4 max-md:flex-col">
        <Card className="p-4 md:flex-1">
          <CardContent className="p-0">
            <LessonForm defaultValues={lesson} redirect={false} />
          </CardContent>
        </Card>

        <Card className="p-4 md:flex-[2]">
          <CardContent className="flex flex-col gap-2 p-0">
            <MdxEditorLesson
              markdown={lesson.content}
              lessonId={params.lessonId}
            />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
