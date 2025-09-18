import { useEffect, useState } from "react";
import styled from "styled-components";
import downArrowSvg from "../img/아래방향 화살표.svg";
import "./Fistmainpaged.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

const Navbar = styled.header`
  height: 73px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 1024px) {
    height: 68px;
  }
  @media (max-width: 768px) {
    height: 64px;
  }
`;

const LogoBox = styled.div`
  color: #fff;
  font-family: Poppins;
  font-size: 20px; /* 4px 감소 */
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 28px;

  @media (max-width: 1024px) {
    font-size: 18px;
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 4px;
  }
`;

const NavMenu = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 88px;

  @media (max-width: 1200px) {
    gap: 48px;
    font-size: 18px; /* 4px 감소 */
  }
  @media (max-width: 1110px) {
    gap: 38px;
    font-size: 16px;
  }
  @media (max-width: 1000px) {
    gap: 30px;
    font-size: 14px;
  }
  @media (max-width: 900px) {
    gap: 22px;
    font-size: 6px;
  }
  @media (max-width: 769px) {
    gap: 10px;
    font-size: 2px;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .bell {
    position: relative;
    font-size: 18px; /* 4px 감소 */
    cursor: pointer;

    &::after {
      content: "1";
      position: absolute;
      top: -6px;
      right: -8px;
      background: #2196f3;
      color: #fff;
      font-size: 8px; /* 4px 감소 */
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
  }

  .login-btn {
    background: #fe8401;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    height: 32px; /* 4px 감소 */
    min-width: 96px; /* 4px 감소 */
    margin-right: 28px;
    font-size: 16px; /* 4px 감소 */
    font-weight: bold;
    @media (max-width: 1024px) {
      height: 30px;
      min-width: 88px;
      margin-right: 12px;
      font-size: 14px;
    }
    @media (max-width: 768px) {
      height: 28px;
      min-width: 84px;
      margin-right: 8px;
      font-size: 12px;
    }
  }
`;

const HeroSection = styled.main`
  display: flex;
  width: 740px;
  padding: 0 2px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0px;
  margin: 0px;
  margin-left: 20px;
  @media (max-width: 1200px) {
    width: 620px;
  }
  @media (max-width: 1024px) {
    width: 560px;
  }
  @media (max-width: 900px) {
    width: 520px;
  }
`;

const HeroTitle = styled.h1`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: clamp(24px, 6vw, 76px); /* 4px 감소 */
  font-style: normal;
  font-weight: 700;
  line-height: 1.1;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const HeroSub = styled.p`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: clamp(12px, 3.2vw, 26px); /* 4px 감소 */
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const HeroButton = styled.button`
  display: flex;
  width: 150px;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 2px solid #fe9c32;
  background: #fff;
  @media (max-width: 1024px) {
    width: 140px;
    height: 42px;
  }
  transition: all 0.5s ease;
  &:hover {
    background-color: #fe9c32;
    .Start {
      color: white;
      transition: all 0.5s ease;
    }
    border: 2px solid white;
  }
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
  font-size: 28px; /* 4px 감소 */
  font-weight: 800;
`;

const BlockedDesc = styled.p`
  margin: 0;
  color: #444;
  font-size: 12px; /* 4px 감소 */
`;

const DownArrow = styled.img`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: auto;
  opacity: 0.8;
`;

function Firstmainpages() {
  const [isMobileBlocked, setIsMobileBlocked] = useState(false);

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

  return (
    <Container>
      <Navbar>
        <LogoBox>GROWupMONEY</LogoBox>
        {!isMobileBlocked ? (
          <>
            <NavMenu>
              <button className="Topbutton">프로그램 정보</button>
              <button className="Topbutton">미디어</button>
              <button className="Topbutton">소식</button>
              <button className="Topbutton">고객지원</button>
              <button className="Topbutton">소셜미디어</button>
            </NavMenu>
            <UserMenu>
              <button className="login-btn">로그인</button>
            </UserMenu>
          </>
        ) : null}
      </Navbar>
      {isMobileBlocked ? (
        <BlockedWrapper>
          <BlockedBox>
            <BlockedTitle>404 - 지원하지 않는 화면 크기</BlockedTitle>
            <BlockedDesc>
              현재 페이지는 가로 768px 이상에서만 이용할 수 있어요.
            </BlockedDesc>
          </BlockedBox>
        </BlockedWrapper>
      ) : (
        <div className="MainFrame">
          <div className="maintitle">
            <HeroSection>
              <HeroTitle>경제공부의 첫 걸음</HeroTitle>
              <HeroSub>GROW UP MONEY와 함께</HeroSub>
              <HeroButton>
                <p
                  className="Start"
                  style={{ fontSize: "clamp(10px, 2vw, 26px)" }}
                >
                  시작하기
                </p>
              </HeroButton>
            </HeroSection>
          </div>
          <DownArrow src={downArrowSvg} alt="아래로 이동" />
        </div>
      )}
    </Container>
  );
}

export default Firstmainpages;
