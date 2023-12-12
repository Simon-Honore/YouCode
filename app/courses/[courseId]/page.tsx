import React from "react";
import { getCourse } from "./course.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/Layout";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";
import MarkdownProse from "@/features/mdx/MarkdownProse";
import { Typography } from "@/components/ui/typography";
import LessonsInACourse from "@/features/lessons/LessonsInACourse";

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session?.user?.id,
  });

  if (!course) {
    return notFound();
  }

  return (
    <Layout>
      <LayoutHeader className="flex flex-row items-center gap-8">
        <Avatar className=" h-24 w-24 rounded">
          <AvatarFallback>{course.name[0]}</AvatarFallback>
          {course.image && <AvatarImage src={course.image} alt={course.name} />}
        </Avatar>

        <div className="flex h-full flex-col justify-around">
          <Typography variant="h2">{course.name}</Typography>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{course.creator.email?.[0]}</AvatarFallback>
              {course.creator.image && (
                <AvatarImage
                  src={course.creator.image}
                  alt={course.creator.name ?? "creator picture"}
                />
              )}
            </Avatar>
            {course.creator.name && (
              <Typography variant="muted">{course.creator.name}</Typography>
            )}
          </div>
        </div>
      </LayoutHeader>

      <LayoutContent className="mt-4 flex flex-row-reverse gap-6">
        <div></div>

        <div className="flex flex-1 flex-col gap-8">
          <MarkdownProse markdown={course.presentation} />

          <LessonsInACourse lessons={course.lessons} />
        </div>
      </LayoutContent>
    </Layout>
  );
}
