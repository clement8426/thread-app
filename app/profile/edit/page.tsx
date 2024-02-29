import { getAuthSession } from "@/lib/auth";
import { getUserEdit } from "@/src/query/user.query";
import { notFound } from "next/navigation";
import { ProfileForm } from "./ProfileForm";
import { editProfile } from "./edit-profile.action";

export default async function EditUser() {
  const session = await getAuthSession();

  const userId = session?.user.id;
  if (!userId) {
    notFound();
    return;
  }

  const user = await getUserEdit(userId);

  if (!user) {
    notFound();
    return;
  }

  return (
    <div className="h-full container flex items-center">
      <div className="bg-card border rounded-md border-border p-4 flex-1">
        <ProfileForm user={user} onSubmit={editProfile} />
      </div>
    </div>
  );
}
