"use server";

import { getUser } from "@/src/query/user.query";
import { WritePostFormValues } from "./WritePostForm";
import { prisma } from "@/lib/prisma";

export const createPost = async (values: WritePostFormValues) => {
  console.log("im' a server function");
  const user = await getUser();
  const post = await prisma.post.create({
    data: {
      content: values.content,
      userId: user.id,
    },
  });
  return post.id;
};
