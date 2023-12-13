import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function SettingsAccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Paramètres du compte</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Card className="p-4">
          <CardContent>
            <form
              action={async (formData) => {
                "use server";

                const userSession = await getRequiredAuthSession();

                const image = formData.get("image");
                const name = formData.get("name");

                const safeData = formSchema.safeParse({
                  name,
                  image,
                });

                if (!safeData.success) {
                  const urlSearchParams = new URLSearchParams();
                  urlSearchParams.set(
                    "error",
                    "invalid data. Image must be an url and name must be between 3 and 40 characters"
                  );
                  redirect(`/account/settings?${urlSearchParams.toString()}`);
                }

                await prisma.user.update({
                  where: {
                    id: userSession.user.id,
                  },
                  data: safeData.data,
                });

                revalidatePath("/account");
                redirect("/account");
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  defaultValue={session.user.image}
                  name="image"
                  id="image"
                  className="bg-secondary"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  defaultValue={session.user.name}
                  name="name"
                  id="name"
                  className="bg-secondary"
                />
              </div>
              {searchParams.error && (
                <Typography>{searchParams.error}</Typography>
              )}
              <Button>Enregistrer</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
