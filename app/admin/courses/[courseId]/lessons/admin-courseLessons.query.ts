import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type GetAdminCourseLessonsProps = {
  userId: string;
  courseId: string;
};

export const getAdminCourseLessons = async ({
  userId,
  courseId,
}: GetAdminCourseLessonsProps) => {
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
      rank: true,
      course: {
        select: {
          name: true,
        },
      },
    },
  });

  return courseLessons;
};

export type GetAdminCourseLessons = Prisma.PromiseReturnType<
  typeof getAdminCourseLessons
>;
