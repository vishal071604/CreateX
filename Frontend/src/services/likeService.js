const API_URL =
  "http://localhost:5000/api/likes";

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};


// =========================
// LIKE
// =========================

export const likePost = async (
  postId
) => {
  const response = await fetch(
    `${API_URL}/${postId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to like post"
    );
  }

  return data;
};


// =========================
// UNLIKE
// =========================

export const unlikePost = async (
  postId
) => {
  const response = await fetch(
    `${API_URL}/${postId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to unlike post"
    );
  }

  return data;
};


// =========================
// LIKE COUNT
// =========================

export const getLikeCount =
  async (postId) => {
    const response = await fetch(
      `${API_URL}/${postId}/count`
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to get likes"
      );
    }

    return data.likesCount;
  };


// =========================
// CHECK LIKE
// =========================

export const checkLike =
  async (postId) => {
    const response = await fetch(
      `${API_URL}/${postId}/check`,
      {
        headers: getAuthHeaders(),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to check like"
      );
    }

    return data.liked;
  };