import PostList from "../components/PostList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Board</h1>
      <PostList />
    </main>
  );
}
