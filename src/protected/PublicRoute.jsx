import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../components/api/axiosInstance";

/**
 * PublicRoute 컴포넌트
 * - 로그인되지 않은 사용자만 접근 가능한 페이지용
 * - 로그인된 사용자는 /roadmap으로 리다이렉트
 */
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 인증이 필요한 API로 토큰 유효성 확인
        await axiosInstance.get("/my/profile");
        setIsAuthenticated(true);
      } catch (error) {
        // 401 또는 다른 에러 = 미인증 상태
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

  // 인증되면 roadmap으로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to="/roadmap" replace />;
  }

  // 인증되지 않으면 자식 컴포넌트 렌더링
  return children;
};

export default PublicRoute;
