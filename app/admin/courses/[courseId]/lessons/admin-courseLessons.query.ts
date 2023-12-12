import { prisma } from "@/lib/prisma";

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
      course: {
        select: {
          name: true,
        },
      },
    },
  });

  return courseLessons;
};
