import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Main_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 중 대기하는 요청들
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

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

// 응답 인터셉터 - 401 에러 시 토큰 갱신 시도
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 현재 경로가 로그인/회원가입 페이지면 그냥 에러 반환
      const currentPath = window.location.pathname;
      const publicPaths = ['/Login', '/signup', '/'];
      
      if (publicPaths.includes(currentPath)) {
        return Promise.reject(error);
      }

      // refresh 요청 자체가 401인 경우 로그인 페이지로 이동
      if (originalRequest.url === '/users/refresh') {
        window.location.href = '/Login';
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중이면 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 갱신 요청
        await axiosInstance.post('/users/refresh');
        
        processQueue(null);
        
        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        
        // 토큰 갱신 실패 시 로그인 페이지로 이동
        window.location.href = '/Login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;