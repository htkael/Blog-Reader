import axios from "axios";

const API_URL = import.meta.env.VITE_APU_URL;

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
