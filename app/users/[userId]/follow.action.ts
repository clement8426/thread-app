"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const followUser = async (userId: string) => {
  const session = await getAuthSession();

  if (!session?.user.id) {
    throw new Error("Not authenticated");
  }

  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: session.user.id,
      followingId: userId,
    },
    select: {
      id: true,
    },
  });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        id: isFollowing.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    });
  }

  revalidatePath(`/users/${userId}`);
};
