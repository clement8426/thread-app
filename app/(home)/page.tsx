import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Post } from "@/src/feature/post/Post";
import { get20LastPosts } from "@/src/query/post.query";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await get20LastPosts(session?.user.id);

  return (
    <div className="divide-y divide-muted ">
      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </div>
  );
}
