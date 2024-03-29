import Link from "next/link";
import { notFound } from "next/navigation";
import { Profile } from "../users/[userId]/Profile";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import { buttonVariants } from "@/components/ui/button";
import { Post } from "@/src/feature/post/Post";

export default async function User({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getAuthSession();

  if (!session?.user.id) {
    notFound();
  }

  const user = await getUserProfile(session.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container">
      <Profile user={user} />
      <div className="mt-4 border-b border-accent pb-4">
        <Link
          href="/profile/edit"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Edit profile
        </Link>
      </div>
      <div className="divide-y divide-accent">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
