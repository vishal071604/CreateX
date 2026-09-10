// In development Vite forwards /api requests to the backend.  A deployed app
// can override this with VITE_API_URL (for example, https://api.example.com/api).
const API_URL = `${import.meta.env.VITE_API_URL || "/api"}/auth`;

const connectionError = (error) =>
  error instanceof TypeError || error.message?.includes("Unexpected token")
    ? "Unable to reach the API. Start the backend server and try again."
    : error.message || "Unable to connect to server";

// =========================
// REGISTER USER
// =========================

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Registration failed"
      );
    }

    return data;
  } catch (error) {
    throw new Error(connectionError(error));
  }
};


// =========================
// LOGIN USER
// =========================

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    return data;
  } catch (error) {
    throw new Error(connectionError(error));
  }
};


// =========================
// LOGOUT USER
// =========================

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
