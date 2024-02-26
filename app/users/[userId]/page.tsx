import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import React from "react";

export default async function UserPage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);
  return <h1>Profile</h1>;
}
