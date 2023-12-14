import { prisma } from "@/lib/prisma";
import { $Enums, LessonState, Prisma } from "@prisma/client";
import { z } from "zod";

export const LessonFormSchema = z.object({
  name: z.string().min(3).max(60),
  state: z.nativeEnum(LessonState),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;
