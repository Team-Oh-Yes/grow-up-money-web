import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import makot from "../img/makot.png"
import "./Error.css"
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

  const handleGoHome = () => {
    navigate("/");
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
