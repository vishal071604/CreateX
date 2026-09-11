import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// =========================
// LIKE POST
// =========================

export const likePost = async (postId) => {
  const response = await axios.post(
    `${API_URL}/likes/${postId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// =========================
// UNLIKE POST
// =========================

export const unlikePost = async (postId) => {
  const response = await axios.delete(
    `${API_URL}/likes/${postId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// =========================
// GET LIKE INFORMATION
// =========================

export const getLikeInfo = async (postId) => {
  const response = await axios.get(
    `${API_URL}/likes/${postId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

