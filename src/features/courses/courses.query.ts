import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type GetCoursesProps = {
  userPage: number;
  itemsPerPage: number;
  userId?: string;
};

export const getCourses = async ({
  userPage,
  userId,
  itemsPerPage,
}: GetCoursesProps) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              id: userId,
            },
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      image: true,
      presentation: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    take: itemsPerPage,
    skip: Math.max(0, userPage * itemsPerPage),
  });
};

export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
