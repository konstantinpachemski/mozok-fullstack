// utils/api.ts

import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const session = await getSession();
      if (session?.user?.refreshToken) {
        try {
          const res = await axios.post("http://localhost:8000/auth/refresh", {
            refreshToken: session.user.refreshToken,
          });
          if (res.data.accessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Refresh ${res.data.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
