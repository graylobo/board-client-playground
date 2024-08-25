"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/api";

export default function PostsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: mounted, // 클라이언트 사이드에서만 쿼리 실행
  });

  if (!mounted) return null; // 서버 사이드 렌더링 시 아무것도 렌더링하지 않음

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}
