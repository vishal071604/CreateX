
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// =========================
// CREATE POST
// =========================

export const createPost = async (formData) => {
  const response = await axios.post(
    `${API_URL}/posts`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// =========================
// GET POSTS
// =========================

export const getPosts = async () => {
  const response = await axios.get(
    `${API_URL}/posts`,
    {
      withCredentials: true,
    }
  );

  return response.data.posts;
};

