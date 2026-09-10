// API URL
const API_URL = `${import.meta.env.VITE_API_URL}/likes`;

// =========================
// GET AUTH HEADERS
// =========================
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// =========================
// LIKE POST
// =========================
export const likePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to like post");
  }

  return data;
};

// =========================
// UNLIKE POST
// =========================
export const unlikePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to unlike post");
  }

  return data;
};

// =========================
// GET LIKE INFORMATION
// =========================
export const getLikeInfo = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to get like information"
    );
  }

  return data;
};