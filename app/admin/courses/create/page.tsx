/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import CourseForm from "@/features/courses/CourseForm";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function CreateCoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Créer un cours</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="p-4">
          <CardContent>
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
