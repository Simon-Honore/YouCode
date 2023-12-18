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
  const courseLessons = await prisma.course.findFirst({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: {
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          state: true,
          rank: true,
          courseId: true,
        },
      },
    },
  });

  return courseLessons;
};

export type GetAdminCourseLessons = Prisma.PromiseReturnType<
  typeof getAdminCourseLessons
>;

export type AdminLessonItemtype = NonNullable<
  Prisma.PromiseReturnType<typeof getAdminCourseLessons>
>["lessons"][number];
