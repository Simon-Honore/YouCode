import React from "react";
import { CoursesCard } from "./courses.query";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";

export type CoursesCardProps = {
  course: CoursesCard;
};

export default function CoursesCard({ course }: CoursesCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="flex h-full items-center p-4 hover:bg-accent">
        <CardContent className="flex flex-row items-center gap-4 p-0">
          <Avatar className=" h-20 w-20 rounded">
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image && (
              <AvatarImage src={course.image} alt={course.name} />
            )}
          </Avatar>

          <div className="flex h-fit flex-col gap-3">
            <Typography variant="h3">{course.name}</Typography>

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
        </CardContent>
      </Card>
    </Link>
  );
}
