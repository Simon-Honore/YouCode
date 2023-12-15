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
import { GetAdminCourseLessons } from "./admin-courseLessons.query";
import AdminCourseLessonItem from "./AdminCourseLessonItem";

export type AdminCourseLessonSortableProps = {
  lessons: GetAdminCourseLessons;
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((lesson) => lesson.id === active.id);
        const newIndex = items.findIndex((lesson) => lesson.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((lesson) => (
          <AdminCourseLessonItem key={lesson.id} lesson={lesson} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
