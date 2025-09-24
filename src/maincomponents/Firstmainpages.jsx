import styled from "styled-components";
import downArrowSvg from "../img/아래방향 화살표.svg";
import "./Fistmainpaged.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
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

const Header = styled.header`
  height: 73px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (min-width: 1921px) {
    height: 80px;
    padding: 0 40px;
  }
  @media (max-width: 1920px) {
    height: 76px;
    padding: 0 32px;
  }
  @media (max-width: 1440px) {
    height: 74px;
    padding: 0 24px;
  }
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
  font-size: 20px;
  font-weight: 700;
  margin-left: 28px;

  @media (min-width: 1921px) {
    font-size: 24px;
    margin-left: 40px;
  }
  @media (max-width: 1920px) {
    font-size: 22px;
    margin-left: 36px;
  }
  @media (max-width: 1440px) {
    font-size: 21px;
    margin-left: 32px;
  }
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

  @media (min-width: 1921px) {
    gap: 120px;
  }
  @media (max-width: 1920px) {
    gap: 100px;
  }
  @media (max-width: 1440px) {
    gap: 94px;
  }
  @media (max-width: 1200px) {
    gap: 68px;
  }
  @media (max-width: 1100px) {
    gap: 58px;
  }
  @media (max-width: 1000px) {
    gap: 48px;
  }
  @media (max-width: 900px) {
    gap: 38px;
  }
  @media (max-width: 800px) {
    gap: 28px;
  }
  @media (max-width: 769px) {
    gap: 20px;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .bell {
    position: relative;
    font-size: 18px;
    cursor: pointer;

    &::after {
      content: "1";
      position: absolute;
      top: -6px;
      right: -8px;
      background: #2196f3;
      color: #fff;
      font-size: 8px;
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
    height: 32px;
    min-width: 96px;
    margin-right: 28px;
    font-size: 16px;
    font-weight: bold;

    @media (min-width: 1921px) {
      height: 38px;
      min-width: 110px;
      margin-right: 40px;
      font-size: 18px;
    }
    @media (max-width: 1920px) {
      height: 36px;
      min-width: 104px;
      margin-right: 36px;
      font-size: 17px;
    }
    @media (max-width: 1440px) {
      height: 34px;
      min-width: 100px;
      margin-right: 32px;
      font-size: 16px;
    }
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

const MainContent = styled.div`
  .MainFrame {
    display: flex;
    flex-direction: column;
  }
  .maintitle {
    display: flex;
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

  @media (min-width: 1921px) {
    width: 920px;
    margin-left: 40px;
  }
  @media (max-width: 1920px) {
    width: 840px;
    margin-left: 32px;
  }
  @media (max-width: 1440px) {
    width: 780px;
    margin-left: 28px;
  }
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
  font-size: clamp(24px, 6vw, 76px);
  font-style: normal;
  font-weight: 700;
  line-height: 1.1;
  word-break: keep-all;
  overflow-wrap: anywhere;

  @media (min-width: 1921px) {
    font-size: clamp(32px, 6vw, 88px);
  }
  @media (max-width: 1920px) {
    font-size: clamp(28px, 6vw, 82px);
  }
  @media (max-width: 1440px) {
    font-size: clamp(26px, 6vw, 78px);
  }
`;

const HeroSub = styled.p`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: clamp(12px, 3.2vw, 26px);
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  word-break: keep-all;
  overflow-wrap: anywhere;

  @media (min-width: 1921px) {
    font-size: clamp(16px, 3.2vw, 32px);
  }
  @media (max-width: 1920px) {
    font-size: clamp(14px, 3.2vw, 30px);
  }
  @media (max-width: 1440px) {
    font-size: clamp(13px, 3.2vw, 28px);
  }
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

  @media (min-width: 1921px) {
    width: 180px;
    height: 58px;
  }
  @media (max-width: 1920px) {
    width: 170px;
    height: 54px;
  }
  @media (max-width: 1440px) {
    width: 160px;
    height: 52px;
  }
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

const DownArrow = styled.img`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: auto;
  opacity: 0.8;

  @media (min-width: 1921px) {
    width: 44px;
    bottom: 32px;
  }
  @media (max-width: 1920px) {
    width: 40px;
    bottom: 28px;
  }
`;

// =========== Styled-components 끝 ===========

// =========== 컴포넌트 시작 ===========

// 헤더 컴포넌트
function Navbar() {
  return (
    <Header>
      <LogoBox>GROWupMONEY</LogoBox>
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
    </Header>
  );
}

// 메인 히어로 섹션 컴포넌트
function Hero() {
  return (
    <HeroSection>
      <HeroTitle>경제공부의 첫 걸음</HeroTitle>
      <HeroSub>GROW UP MONEY와 함께</HeroSub>
      <HeroButton>
        <p className="Start" style={{ fontSize: "clamp(10px, 2vw, 26px)" }}>
          시작하기
        </p>
      </HeroButton>
    </HeroSection>
  );
}

// 전체 페이지를 렌더링하는 메인 컴포넌트
function Firstmainpages() {
  return (
    <Container>
      <Navbar />
      <div className="MainFrame">
        <div className="maintitle">
          <Hero />
        </div>
        <DownArrow src={downArrowSvg} alt="아래로 이동" />
      </div>
    </Container>
  );
}

export default Firstmainpages;
