// /src/lib/axios.ts
import axios, { AxiosError } from "axios";
import { useLoadingStore } from "./loadingStore";
import { useAuthStore } from "./authStore";
import { toast } from "sonner";

// Create an instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // Add your URL if needed
  timeout: 10000,
});

// === Request Interceptor ===
axiosInstance.interceptors.request.use(
  (config) => {
    // Start loader
    useLoadingStore.getState().setLoading(true);

    // Attach Authorization token if available
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// === Response Interceptor ===
axiosInstance.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  (error: AxiosError) => {
    useLoadingStore.getState().setLoading(false);

    if (error.response) {
      const status = error.response.status;
      const message =
        (error.response.data as { message?: string })?.message || "Something went wrong";

      if (status === 401) {
        // Token expired, logout user
        useAuthStore.getState().logout();
      }

      toast.error(message);
    } else {
      toast.error("Network error or server not reachable.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
