"use server";

import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { prisma } from "@/lib/prisma";
import { ServerError, authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";

const SaveLessonsMoveSchema = z.object({
  newDownItemRank: z.string().optional(),
  newUpItemRank: z.string().optional(),
  lessonId: z.string(),
});

export const saveLessonsMove = authentificatedAction(
  SaveLessonsMoveSchema,
  async (data, { userId }) => {
    const course = await prisma.course.findFirst({
      where: {
        creatorId: userId,
      },
    });

    if (!course) {
      throw new ServerError("Course not found");
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: data.lessonId,
        courseId: course.id,
      },
    });

    if (!lesson) {
      throw new ServerError("Lesson not found");
    }

    const newRank = getTheMiddleRank(data.newUpItemRank, data.newDownItemRank);

    await prisma.lesson.update({
      where: {
        id: data.lessonId,
      },
      data: {
        rank: newRank,
      },
    });

    return newRank;
  }
);
