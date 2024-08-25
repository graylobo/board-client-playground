"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../lib/api";
import { Post } from "@/types";

export default function PostList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul>
        {posts &&
          posts.map((post: Post) => (
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
    </div>
  );
}
