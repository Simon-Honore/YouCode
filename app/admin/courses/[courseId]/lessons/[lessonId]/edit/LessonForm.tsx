"use client";

import React from "react";
import { LessonFormSchema } from "./lesson.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { lessonActionEdit } from "./lesson.action";
import { toast } from "sonner";
import { LessonState } from "@prisma/client";

export type LessonFormProps = {
  defaultValues: LessonFormSchema & {
    id: string;
  };
};

export default function LessonForm({ defaultValues }: LessonFormProps) {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: defaultValues,
  });

  const router = useRouter();

  return (
    <Form
      className="space-y-4"
      form={form}
      onSubmit={async (values) => {
        const { data, serverError } = await lessonActionEdit({
          lessonId: defaultValues.id,
          data: values,
        });

        if (data) {
          toast.success(
            `Le cours a été ${defaultValues?.id ? "modifié." : "créé."}`
          );
          router.push(`/admin/courses/${data.lesson.courseId}/lessons`);
          router.refresh();
          return;
        }

        toast.error("Une erreur est survenue.", {
          description: serverError,
        });
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LessonState).map((state) => (
                    <SelectItem value={state} key={state}>
                      {state.charAt(0) + state.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}
