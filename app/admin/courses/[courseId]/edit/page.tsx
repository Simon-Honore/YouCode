/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/form/SubmitButton";
import CourseForm from "./CourseForm";

const formSchema = z.object({
  name: z.string().min(3).max(60),
  image: z.string().url(),
  presentation: z.string().min(3),
});

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      presentation: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Modifier un cours</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="p-4">
          <CardContent>
            <CourseForm defaultValues={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
