import React from "react";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CoursePaginationButton } from "@/features/pagination/PaginationButton";
import CoursesCard from "@/features/courses/CoursesCard";
import { getCourses } from "@/features/courses/courses.query";
import { getAuthSession } from "@/lib/auth";
import NotAuthenticatedCard from "@/features/errors/NotAuthenticatedCard";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);
  const itemsPerPage = 10;
  const session = await getAuthSession();

  if (!session) {
    return <NotAuthenticatedCard />;
  }

  const courses = await getCourses({
    userPage: page,
    itemsPerPage: itemsPerPage,
    userId: session.user.id,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Mes cours</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6 py-6">
        <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
          {courses.map((course) => (
            <CoursesCard course={course} key={course.id} />
          ))}
        </div>
        <CoursePaginationButton
          totalPage={Math.ceil(courses.length / itemsPerPage)}
          page={page}
          baseUrl="/courses"
        />
      </LayoutContent>
    </Layout>
  );
}
