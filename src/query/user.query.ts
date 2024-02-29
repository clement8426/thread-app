import { Prisma } from "@prisma/client";
import { cache } from "react";
import { postSelectQuery } from "./post.query";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

const userQuery = {
  id: true,
  name: true,
  username: true,
  image: true,
  bio: true,
  createdAt: true,
  link: true,
} satisfies Prisma.UserSelect;

export const getUserProfile = cache((userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ...userQuery,
      _count: {
        select: {
          followed: true,
          likes: true,
        },
      },
      posts: {
        select: {
          ...postSelectQuery(userId),
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
      followed: {
        select: {
          follower: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
});

export const getUser = async () => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

export const getUserEdit = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      ...userQuery,
    },
  });
};

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

export type UserEdit = NonNullable<
  Prisma.PromiseReturnType<typeof getUserEdit>
>;
