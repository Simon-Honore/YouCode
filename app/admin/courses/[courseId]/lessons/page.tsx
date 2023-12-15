import { getRequiredAuthSession } from "@/lib/auth";
import React from "react";
import { getAdminCourseLessons } from "./admin-courseLessons.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { notFound, redirect } from "next/navigation";
import AdminCourseLessonItem from "./AdminCourseLessonItem";
import Link from "next/link";
import SubmitButton from "@/components/form/SubmitButton";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

export default async function CoursesLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { user } = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: user.id,
    },
    select: {
      name: true,
    },
  });

  const lessons = await getAdminCourseLessons({
    courseId: params.courseId,
    userId: user.id,
  });

  if (!lessons) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Leçons du cours : {course?.name}</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Card>
          <CardContent className="flex flex-col divide-y-2 px-8 py-4">
            {lessons.map((lesson) => (
              <Link
                href={`/admin/courses/${params.courseId}/lessons/${lesson.id}/edit`}
                key={lesson.id}
              >
                <AdminCourseLessonItem lesson={lesson} />
              </Link>
            ))}
            <form>
              <SubmitButton
                className="my-2 w-full"
                variant="secondary"
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();

                  const courseId = params.courseId;

                  // Authaurize user
                  await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  const lesson = await prisma.lesson.create({
                    data: {
                      courseId: courseId,
                      name: "Nouvelle leçon",
                      state: "HIDDEN",
                      rank: "aaaaa",
                      content: "## Contenu",
                    },
                  });

                  redirect(
                    `/admin/courses/${courseId}/lessons/${lesson.id}/edit`
                  );
                }}
              >
                <Plus className="mr-2" size={16} />
                Créer une leçon
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
