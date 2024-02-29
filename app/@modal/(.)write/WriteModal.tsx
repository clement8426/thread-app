"use client";

import WritePostFrom, { WritePostFormValues } from "@/app/write/WritePostForm";
import { createPost } from "@/app/write/write-post.action";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function WriteModal({
  user,
  createPost,
}: {
  user: User;
  createPost: (values: WritePostFormValues) => Promise<string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("/write")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostFrom user={user} onSubmit={createPost} />
      </DialogContent>
    </Dialog>
  );
}
