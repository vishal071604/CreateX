// API URL
const API_URL = `${import.meta.env.VITE_API_URL}/posts`;

// =========================
// CREATE POST
// =========================
export const createPost = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create post"
    );
  }

  return data;
};

// =========================
// GET POSTS
// =========================
export const getPosts = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch posts"
    );
  }

  return data.posts;
};