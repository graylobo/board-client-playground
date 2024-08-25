export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId?: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
}
