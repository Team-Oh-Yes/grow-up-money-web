import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axiosInstance from "../components/api/axiosInstance";

/**
 * PrivateRoute 컴포넌트
 * - API를 통해 토큰 유효성을 확인
 * - 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
 */
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 인증이 필요한 API로 토큰 유효성 확인
        await axiosInstance.get("/my/profile");
        setIsAuthenticated(true);
      } catch (error) {
        console.log("인증 실패:", error.response?.status);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f5f5f5",
        }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // 인증되지 않으면 로그인 페이지로 리다이렉트 (현재 경로 저장)
  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // 인증되면 자식 컴포넌트 렌더링
  return children;
};

export default PrivateRoute;
