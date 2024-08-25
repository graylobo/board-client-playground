"use client";
import {
  deleteComment,
  getComments,
  likeComment,
  updateComment,
} from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentList({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  const updateMutation = useMutation({
    mutationFn: (variables: { id: number; content: string }) =>
      updateComment(variables.id, { content: variables.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const likeMutation = useMutation({
    mutationFn: (commentId: number) => likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      <ul>
        {comments.map(
          (comment: { id: number; content: string; likes: number }) => (
            <li key={comment.id} className="mb-2">
              <p>{comment.content}</p>
              <button
                onClick={() =>
                  updateMutation.mutate({
                    id: comment.id,
                    content: "Updated comment",
                  })
                }
              >
                Update
              </button>
              <button onClick={() => deleteMutation.mutate(comment.id)}>
                Delete
              </button>
              <button onClick={() => likeMutation.mutate(comment.id)}>
                Like ({comment.likes})
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
