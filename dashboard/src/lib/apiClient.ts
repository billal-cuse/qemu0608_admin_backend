import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise: Promise<any> | null = null;

ApiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

ApiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refresh token call (HTTP-only cookie)
      if (!refreshPromise) {
        refreshPromise = ApiClient.post("/auth/refresh-token").finally(
          () => (refreshPromise = null),
        );
      }

      const { data } = await refreshPromise;
      const { accessToken } = data;

      // save access token in store
      useAuthStore
        .getState()
        .setAuth(accessToken, useAuthStore.getState().user);

      // update axios headers
      ApiClient.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      // retry original request
      return ApiClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
