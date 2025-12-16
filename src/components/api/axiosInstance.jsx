import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Main_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 에러 시 로그인 페이지로 리다이렉트
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 현재 경로가 로그인/회원가입 페이지가 아닐 때만 리다이렉트
      const currentPath = window.location.pathname;
      const publicPaths = ['/Login', '/signup', '/'];
      
      if (!publicPaths.includes(currentPath)) {
        window.location.href = '/Login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;