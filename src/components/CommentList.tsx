"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { likeComment, deleteComment } from "../lib/api";
import CommentForm from "./CommentForm";
import { useRefetchStore } from "@/store/refetch-store";

interface CommentProps {
  comment: any;
  postId: number;
}

function Comment({ comment, postId }: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const queryClient = useQueryClient();
  const refetch = useRefetchStore((state) => state.refetch);

  const likeMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      refetch();
    },
  });

  return (
    <div className={`ml-4 mt-2 ${comment.parentId ? "ml-8" : ""}`}>
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
          className="text-sm text-blue-500 mr-2"
        >
          Reply
        </button>
        <button
          onClick={() => deleteMutation.mutate(comment.id)}
          className="text-sm text-red-500"
        >
          Delete
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

type CommentListProps = {
  postId: number;
  comments: any[];
};

export default function CommentList({ postId, comments }: CommentListProps) {
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
