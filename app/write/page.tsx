import { getAuthSession } from "@/lib/auth";
import WritePostFrom from "./WritePostForm";
import { createPost } from "./write-post.action";
import { getUser } from "@/src/query/user.query";
import { signIn } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    await signIn();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div className="w-full">
      <WritePostFrom user={user} onSubmit={createPost} />
    </div>
  );
}
