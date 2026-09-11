import axios from "axios";

// API URL
const API_URL = import.meta.env.VITE_API_URL;

// =========================
// REGISTER USER
// =========================

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// =========================
// LOGIN USER
// =========================

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// =========================
// LOGOUT USER
// =========================

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};