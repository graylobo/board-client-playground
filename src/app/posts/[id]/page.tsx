"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPost } from "../../../lib/api";
import CommentList from "../../../components/CommentList";
import CommentForm from "../../../components/CommentForm";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params.id);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-8">{post.content}</p>
      <CommentList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
}
