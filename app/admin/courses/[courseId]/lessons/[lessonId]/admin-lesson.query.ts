import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type GetAdminLessonProps = {
  userId: string;
  courseId: string;
  lessonId: string;
};

export const getAdminLesson = async ({
  userId,
  courseId,
  lessonId,
}: GetAdminLessonProps) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      courseId: courseId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      name: true,
      id: true,
      content: true,
      state: true,
    },
  });

  return lesson;
};

export type GetAdminLesson = Prisma.PromiseReturnType<typeof getAdminLesson>;
