import { Post } from "@/src/feature/post/Post";
import { getPost } from "@/src/query/post.query";
import { getUser } from "@/src/query/user.query";
import NotFound from "../../not-found";
import WritePostFrom from "@/app/write/WritePostForm";
import { createReply } from "./write-reply.action";

export default async function PostReply({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const user = await getUser();

  const post = await getPost(params.postId, user.id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div>
      <Post post={post} />
      <WritePostFrom
        user={user}
        onSubmit={async (values) => {
          "use server";
          return createReply(post.id, values);
        }}
      />
    </div>
  );
}
