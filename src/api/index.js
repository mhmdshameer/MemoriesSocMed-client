import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

export const fetchSearchPosts = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.memorySearch || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = async (newPost) => {
  try {
    const response = await API.post("/posts", newPost);
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error; // Or handle it as needed
  }
};
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
