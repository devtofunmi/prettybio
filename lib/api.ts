import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://prettybioo.up.railway.app",
  withCredentials: true, // Send cookies like refresh_token to backend
});

// Add request interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshRes = await axios.post(
          "https://prettybio.up.railway.app/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;
        if (!newAccessToken) {
          throw new Error("No new access token received");
        }

        // Store new access token and retry original request
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        console.error(" Refresh token failed:", refreshErr.response?.data || refreshErr.message);

        // Cleanup and redirect to login
        localStorage.removeItem("accessToken");
        window.location.href = "/authentication/Login";

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
