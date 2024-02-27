"use client";

import { UserEdit } from "@/src/query/user.query";
import { ProfileForm, ProfileFormType } from "@/app/profile/edit/ProfileForm";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";

export const EditProfileModal = ({
  user,
  editProfile,
}: {
  user: UserEdit;
  editProfile: (values: ProfileFormType) => Promise<string | void>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("/profile/edit")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <ProfileForm user={user} onSubmit={editProfile} />
      </DialogContent>
    </Dialog>
  );
};
