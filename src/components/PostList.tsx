"use client";
import Link from "next/link";
import { Post } from "../types";
import { useAuth } from "@/contexts/AuthContext";

interface PostListProps {
  posts?: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const { isLoggedIn, username } = useAuth();

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
