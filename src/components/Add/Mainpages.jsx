import { useEffect, useState } from "react";
import styled from "styled-components";
import Loginpages from "../common/Logincomponents/Loginpages";
import Firstmainpages from "../common/maincomponents/Firstmainpages";
import Secondmainpages from "../common/maincomponents/Secondmainpages";
import Thirdmainpages from "../common/maincomponents/Thirdmainpages";
import "../css/mainpagescsss/Mainpages.css";
import { useRecoilState } from "recoil";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const BlockedWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const BlockedBox = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 640px;
  width: 100%;
  text-align: center;
`;

const BlockedTitle = styled.h2`
  margin: 0 0 8px 0;
  color: #222;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 800;
`;

const BlockedDesc = styled.p`
  margin: 0;
  color: #444;
  font-size: 16px;
`;

// 모바일 차단 컴포넌트
function MobileBlocker() {
  return (
    <Container>
      <BlockedWrapper>
        <BlockedBox>
          <BlockedTitle>404 - 지원하지 않는 화면 크기</BlockedTitle>
          <BlockedDesc>
            현재 페이지는 가로 768px 이상에서만 이용할 수 있어요.
          </BlockedDesc>
        </BlockedBox>
      </BlockedWrapper>
    </Container>
  );
}
import { Loginstate } from "../../atoms";
import { Mobilestate } from "../../atoms";
function Mainpages() {
    
  const [Login, setLogin] = useRecoilState(Loginstate);
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobileBlocked(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 768px 이하일 때 404 페이지만 표시
  if (isMobileBlocked) {
    return <MobileBlocker />;
  }

  // 768px 이상일 때 모든 페이지 표시
  return (
    <div>
      <Firstmainpages setLogin={setLogin}/>
      <Secondmainpages />
      <Thirdmainpages />
      {Login ? <Loginpages  setLogin={setLogin}/> : null}
    </div>
  );
}

export default Mainpages;
