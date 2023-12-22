"use server";

import { prisma } from "@/lib/prisma";
import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonActionEditContent = authentificatedAction(
  LessonActionEditContentSchema,
  async ({ lessonId, markdown }, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: {
        content: markdown,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  }
);
