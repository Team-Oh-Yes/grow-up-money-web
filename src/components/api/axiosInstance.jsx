import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Main_URL,
  withCredentials: true, // ✅ 쿠키 자동 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 모든 요청에 쿠키 포함 확인
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;