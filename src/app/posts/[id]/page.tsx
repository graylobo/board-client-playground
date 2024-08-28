"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { deletePost, getPost } from "../../../lib/api";
import CommentList from "../../../components/CommentList";
import CommentForm from "../../../components/CommentForm";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn, username } = useAuth();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/posts");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  const isAuthor = isLoggedIn && post.author.username === username;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Author: {post.author.username} | Posted on:{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mb-8">{post.content}</p>
      {isAuthor && (
        <div className="mb-4">
          <Link
            href={`/posts/${postId}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteMutation.mutate(postId)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
      <CommentForm postId={postId} />
      <CommentList key={postId} postId={postId} comments={post.comments} />
    </div>
  );
}
