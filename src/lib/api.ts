import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = () =>
  api.get("/posts").then((res) => {
    return res.data;
  });
export const getPost = (id: number) =>
  api.get(`/posts/${id}`).then((res) => res.data);
export const createPost = (data: { title: string; content: string }) =>
  api.post("/posts", data).then((res) => res.data);
export const updatePost = (
  id: number,
  data: { title: string; content: string }
) => api.patch(`/posts/${id}`, data).then((res) => res.data);
export const deletePost = (id: number) =>
  api.delete(`/posts/${id}`).then((res) => res.data);

export const validateToken = () =>
  api.get("/auth/validate").then((res) => res.data);

export const getComments = (postId: number) =>
  api.get(`/comments/post/${postId}`).then((res) => res.data);
export const createComment = (data: {
  content: string;
  postId: number;
  parentId?: number;
}) => api.post("/comments", data).then((res) => res.data);
export const updateComment = (id: number, data: { content: string }) =>
  api.patch(`/comments/${id}`, data).then((res) => res.data);
export const deleteComment = (id: number) =>
  api.delete(`/comments/${id}`).then((res) => res.data);
export const likeComment = (id: number) =>
  api.post(`/comments/${id}/like`).then((res) => res.data);

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data).then((res) => res.data);
export const register = (data: { username: string; password: string }) =>
  api.post("/auth/register", data).then((res) => res.data);
