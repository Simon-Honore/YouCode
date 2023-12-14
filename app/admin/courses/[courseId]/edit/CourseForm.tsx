"use client";

import React from "react";
import { CourseFormSchema } from "./course.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { courseActionEdit } from "./course.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type CourseFormProps = {
  defaultValues?: CourseFormSchema & {
    id: string;
  };
};

export default function CourseForm({ defaultValues }: CourseFormProps) {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValues,
  });

  const router = useRouter();

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        console.log(values);

        if (defaultValues?.id) {
          const { data, serverError } = await courseActionEdit({
            courseId: defaultValues?.id,
            data: values,
          });

          if (data) {
            toast.success("Le cours a été modifié.");
            router.push(`/admin/courses/${defaultValues.id}`);
            router.refresh();
            return;
          }

          toast.error("Une erreur est survenue.", {
            description: serverError,
          });
        } else {
          // create
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Titre" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use{" "}
              <Link href="https://imgur.com" target="_blank">
                Imgur
              </Link>{" "}
              to host your image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Présentation</FormLabel>
            <FormControl>
              <Textarea placeholder="## Un Titre" {...field} />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Enregistrer</Button>
    </Form>
  );
}
