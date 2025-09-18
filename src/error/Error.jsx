import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #343a40;
  font-family: "Arial", sans-serif;
`;

const ErrorTitle = styled.h1`
  font-size: 8rem;
  color: #dc3545;
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const GoHomeButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Error() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <ErrorContainer>
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
      <p>요청하신 페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
      <GoHomeButton onClick={handleGoHome}>홈으로 돌아가기</GoHomeButton>
    </ErrorContainer>
  );
}

export default Error;
