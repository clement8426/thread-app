"use client";

import WritePostFrom, { WritePostFormValues } from "@/app/write/WritePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ReplyModal({
  user,
  createReply,
}: {
  user: User;
  createReply: (values: WritePostFormValues) => Promise<string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("/reply")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostFrom user={user} onSubmit={createReply} />
      </DialogContent>
    </Dialog>
  );
}