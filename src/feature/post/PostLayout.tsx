import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostHome } from "@/src/query/post.query";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type PostLayoutProps = PropsWithChildren<{
  user: PostHome["user"];
  createdAt?: Date;
  className?: string;
  postId?: string;
}>;

export const PostLayout = ({
  className,
  user,
  createdAt,
  postId,
}: PostLayoutProps) => {
  return (
    <div className={clsx("flex w-full flexrow items-start p-4", className)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username} />
        ) : null}
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
