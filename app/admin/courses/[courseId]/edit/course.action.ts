"use server";

import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";
import { prisma } from "@/lib/prisma";

const courseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authentificatedAction(
  courseActionEditProps,
  async (props, { userId }) => {
    await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });

    return "Course updated successfully";
  }
);
