import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type GetCourseProps = {
  courseId: string;
  userId?: string;
};

export const getCourse = async ({ courseId, userId = "-" }: GetCourseProps) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      lessons: {
        where: {
          state: {
            in: ["PUBLISHED", "PUBLIC"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          state: true,
          name: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
      _count: {
        select: {
          lessons: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const lessonProgress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress: lessonProgress,
    };
  });

  return {
    ...course,
    lessons,
  };
};

export type CourseDetails = NonNullable<
  Prisma.PromiseReturnType<typeof getCourse>
>;

export type LessonInACourse = CourseDetails["lessons"][0];
