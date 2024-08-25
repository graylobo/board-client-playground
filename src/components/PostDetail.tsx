"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPost, updatePost, deletePost } from "../lib/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function PostDetail({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
  const updateMutation = useMutation({
    mutationFn: (data: { id: number; title: string; content: string }) =>
      updatePost(data.id, { title: data.title, content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Redirect to posts list
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <div className="mb-4">
        <button
          onClick={() =>
            updateMutation.mutate({
              id: post.id,
              title: "Updated Title",
              content: "Updated Content",
            })
          }
        >
          Update Post
        </button>
        <button onClick={() => deleteMutation.mutate(post.id)}>
          Delete Post
        </button>
      </div>
      <CommentList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
}
