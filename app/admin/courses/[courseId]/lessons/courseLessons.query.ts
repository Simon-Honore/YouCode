import { prisma } from "@/lib/prisma";

export type GetCourseLessonsProps = {
  userId: string;
  courseId: string;
};

export const getCourseLessons = async ({
  userId,
  courseId,
}: GetCourseLessonsProps) => {
  const courseLessons = await prisma.lesson.findMany({
    where: {
      courseId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      id: true,
      name: true,
      state: true,
      course: {
        select: {
          name: true,
        },
      },
    },
  });

  return courseLessons;
};
