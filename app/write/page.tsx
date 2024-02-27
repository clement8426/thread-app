import WritePostFrom from "./WritePostForm";
import { createPost } from "./write-post.action";
import { getUser } from "@/src/query/user.query";

export default async function Write() {
  const user = await getUser();
  return <WritePostFrom user={user} onSubmit={createPost} />;
}
