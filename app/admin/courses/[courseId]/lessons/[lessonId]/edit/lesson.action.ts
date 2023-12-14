"use server";

import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { LessonFormSchema } from "./lesson.schema";
import { prisma } from "@/lib/prisma";

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
});

export const lessonActionEdit = authentificatedAction(
  LessonActionEditProps,
  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return { message: "Lesson updated successfully", lesson };
  }
);
