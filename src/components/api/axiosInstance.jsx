import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

// // 응답 인터셉터 - 쿠키 저장 확인 로그
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // 쿠키가 제대로 설정되었는지 확인
//     if (response.headers['Set-Cookie']) {
//       console.log('쿠키 설정됨:', response.headers['Set-Cookie']);
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;