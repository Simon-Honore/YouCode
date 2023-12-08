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

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);
  const itemsPerPage = 10;

  const courses = await getCourses({
    userPage: page,
    itemsPerPage: itemsPerPage,
  });
  console.log("courses >> ", courses);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Liste des cours</LayoutTitle>
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
