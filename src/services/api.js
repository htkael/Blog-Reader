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

export const getPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: { message: "User not authorized" } };
    }
    const response = await api.get("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response?.data || { message: "Failed to fetch posts" };
  }
};

export const getSinglePost = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: { message: "User not authorized" } };
    }
    const response = await api.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return (
      err.response?.data || { message: "Failed to fetch post with id", id }
    );
  }
};

export const likePost = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log("id", id);
    if (!token) {
      return { error: { message: "User not authorized" } };
    }
    const response = await api.post(
      `/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    return (
      err.response?.data || { message: "Failed to fetch post with id", id }
    );
  }
};

export const postComment = async (id, content) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/posts/${id}/comments`,
      {
        id,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return (
      err.response?.data || {
        message: `Failed to comment on post with id: ${id} and content: ${content}`,
      }
    );
  }
};

export const deleteComment = async (id, commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(
      `/posts/${id}/comments/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response?.data || { message: "Failed to delete comment" };
  }
};
