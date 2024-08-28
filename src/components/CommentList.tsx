"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, createComment, likeComment } from "../lib/api";
import CommentForm from "./CommentForm";

interface CommentProps {
  postId: number;
  parentId?: number;
}

function Comment({ comment, postId }: { comment: any; postId: number }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return (
    <div className="ml-4 mt-2">
      <p>{comment.content}</p>
      <div className="mt-1">
        <button
          onClick={() => likeMutation.mutate(comment.id)}
          className="text-sm text-blue-500 mr-2"
        >
          Like ({comment.likes})
        </button>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-blue-500"
        >
          Reply
        </button>
      </div>
      {showReplyForm && <CommentForm postId={postId} parentId={comment.id} />}
      {comment.replies &&
        comment.replies.map((reply: any) => (
          <Comment key={reply.id} comment={reply} postId={postId} />
        ))}
    </div>
  );
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error)
    return <div>Error loading comments: {(error as Error).message}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
      {comments && comments.length > 0 ? (
        comments.map((comment: any) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
