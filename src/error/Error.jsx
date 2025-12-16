import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import makot from "../img/makot.png"
import "./Error.css"
import axiosInstance from "../components/api/axiosInstance";

// 스타일드 컴포넌트 정의
const Econ = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

function Error() {
  const navigate = useNavigate();

  // 페이지 로드 시 쿠키 확인을 위해 서버 통신
  useEffect(() => {
    const refreshCookie = async () => {
      try {
        await axiosInstance.get('/healthCheck');
      } catch (error) {
        // 에러 무시 - 쿠키 새로고침 목적
      }
    };
    refreshCookie();
  }, []);

  const handleGoHome = async () => {
    try {
      // 로그인 상태 확인 (인증 필요한 API로 확인)
      await axiosInstance.get('/my/profile');
      // 성공하면 로그인된 상태
      navigate("/roadmap");
    } catch (error) {
      // 실패하면 비로그인 상태
      navigate("/");
    }
  };

  return (
    <Econ>
        <img src={makot}></img>
        <p className="sub">Something went wrong</p>
        <p className="fortitle">404 | Page Not found</p>
        <button className="gh" onClick={handleGoHome}>홈으로가기</button>
    </Econ>
  );
}

export default Error;
