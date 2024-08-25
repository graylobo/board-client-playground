"use client";

import { useParams } from "next/navigation";
import PostDetail from "../../../components/PostDetail";

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id);

  return (
    <main className="container mx-auto p-4">
      <PostDetail postId={postId} />
    </main>
  );
}
