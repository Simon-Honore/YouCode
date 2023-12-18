"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AdminLessonItemtype } from "./admin-courseLessons.query";
import AdminCourseLessonItem from "./AdminCourseLessonItem";
import { useMutation } from "@tanstack/react-query";
import { saveLessonsMove } from "./AdminLessons.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type AdminCourseLessonSortableProps = {
  lessons: AdminLessonItemtype[];
};

export default function AdminCourseLessonSortable({
  lessons: defaultItems,
}: AdminCourseLessonSortableProps) {
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      activeId,
      newUpItemRank,
      newDownItemRank,
    }: {
      activeId: string;
      newUpItemRank: string | undefined;
      newDownItemRank: string | undefined;
    }) => {
      const { serverError, data } = await saveLessonsMove({
        lessonId: activeId,
        newUpItemRank,
        newDownItemRank,
      });

      if (serverError) {
        toast.error(serverError);
      }

      if (!data) {
        return;
      }

      router.refresh();

      setItems((prevItems) => {
        const activeItem = prevItems.find((item) => item.id === activeId);
        if (!activeItem) return prevItems;

        activeItem.rank = data;

        return [...prevItems];
      });
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((lesson) => lesson.id === active.id);
        const newIndex = items.findIndex((lesson) => lesson.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        const newDownItemRank = newItems[newIndex + 1]?.rank;
        const newUpItemRank = newItems[newIndex - 1]?.rank;

        mutation.mutate({
          activeId: active.id.toString(),
          newUpItemRank,
          newDownItemRank,
        });

        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        disabled={mutation.isPending}
      >
        {items.map((lesson) => (
          <AdminCourseLessonItem
            key={lesson.id}
            lesson={lesson}
            isPending={mutation.isPending}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
