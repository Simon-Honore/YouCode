import {
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
  Layout,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import CourseForm from "@/features/courses/CourseForm";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import LessonForm from "./LessonForm";
import { LessonState } from "@prisma/client";

export default async function LessonEditPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getRequiredAuthSession();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
      courseId: params.courseId,
      course: {
        creatorId: session.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      state: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Modifier une leçon</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="p-4">
          <CardContent>
            <LessonForm defaultValues={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
