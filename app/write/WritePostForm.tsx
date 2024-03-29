"use client";

import { z } from "zod";
import Write from "./page";
import { User } from "@prisma/client";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PostLayout } from "@/src/feature/post/PostLayout";
import { Button } from "@/components/ui/button";
import { ContentTextArea } from "@/components/ui/ContentTextArea";

const Schema = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  onSubmit: (values: WritePostFormValues) => Promise<string>;
};

export default function WritePostFrom({ user, onSubmit }: WritePostFormProps) {
  const form = useZodForm({
    schema: Schema,
  });

  const router = useRouter();
  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const postId = await onSubmit(values);
          console.log("sumbit client side, postId: ", postId);

          router.push(`/posts/${postId}`);
          window.location.href = `/posts/${postId}`;

          router.refresh();
        }}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="border border-gray-300 rounded-md mb-1">
                <ContentTextArea {...field} rows={4} className="w-full p-2" />
              </div>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size="sm">Post</Button>
        </div>
      </Form>
    </PostLayout>
  );
}
