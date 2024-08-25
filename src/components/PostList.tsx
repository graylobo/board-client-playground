import Link from "next/link";
import { Post } from "../types";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id} className="mb-2">
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-500 hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
