import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (username, password, password_conf) => {
  try {
    const response = await api.post("/auth/sign-up", {
      username,
      password,
      password_conf,
    });
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: "Network error" };
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    console.log("Response:", response);
    return response.data;
  } catch (err) {
    console.log("Login Error details:", err.response?.data || err);
    return err.response?.data || { message: "Failed to login" };
  }
};
