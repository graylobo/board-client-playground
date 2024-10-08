"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../lib/api";
import { useRefetchStore } from "@/store/refetch-store";

interface CommentFormProps {
  postId: number;
  parentId?: number;
}

export default function CommentForm({ postId, parentId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const refetch = useRefetchStore((state) => state.refetch);
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setContent("");
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ content, postId, parentId });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Submit Comment
      </button>
    </form>
  );
}
