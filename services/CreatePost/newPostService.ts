import axios from "axios";
import { Post } from "@/types/api.types";
const API_BASE_URL = "http://localhost:8088/api/posts"; 


export const createNewPost = async (post: Omit<Post, "id" | "createdAt">): Promise<Post> => {
  try {
    const response = await axios.post<Post>(API_BASE_URL, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};