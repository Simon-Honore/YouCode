import React from "react";
import { CoursesCard } from "./courses.query";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";

export type CoursesCardProps = {
  course: CoursesCard;
};

export default function CoursesCard({ course }: CoursesCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full hover:bg-accent">
        <CardHeader className="flex flex-row gap-4 space-y-0 p-4">
          <Avatar className="my-6 h-20 w-20 rounded">
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image && (
              <AvatarImage src={course.image} alt={course.name} />
            )}
          </Avatar>

          <div className="flex flex-col gap-3">
            <Typography variant="h3">{course.name}</Typography>
            <Typography variant="small">{course.presentation}</Typography>

            <div className="inline-flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{course.creator.email?.[0]}</AvatarFallback>
                {course.creator.image && (
                  <AvatarImage
                    src={course.creator.image}
                    alt={course.creator.name ?? "author picture"}
                  />
                )}
              </Avatar>
              <Typography variant="small" className="text-muted-foreground">
                {course.creator.name ?? "Auteur anonyme"}
              </Typography>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
