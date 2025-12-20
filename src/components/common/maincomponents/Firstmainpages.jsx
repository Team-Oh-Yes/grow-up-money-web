import { useState } from "react";
import styled from "styled-components";
import downArrowSvg from "../../../img/arrowdown.svg";
import Main from "../../../Video/nausrh.mp4";
import "../../css/mainpagescsss/Fistmainpaged.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5; /* 기본 배경색 */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
  }
`;

const Header = styled.header`
  height: 73px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid #eee;

  @media (min-width: 1921px) {
    height: 80px;
    padding: 0 40px;
  }
  @media (max-width: 1920px) {
    height: 76px;
    padding: 0 32px;
  }
  /* ... 기존 미디어 쿼리 동일 ... */
`;

const LogoBox = styled.div`
  color: #fe8401;
  font-family: Poppins;
  font-size: 26px;
  font-weight: 700;
  margin-left: 0px;
  cursor: pointer;
  /* ... 기존 미디어 쿼리 동일 ... */
`;

const NavMenu = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 88px;
  /* ... 기존 미디어 쿼리 동일 ... */
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .login-btn {
    background: #fe8401;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    height: 36px;
    min-width: 96px;
    font-size: 16px;
  }
`;

const MainFrameContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff; /* 영상이 끝나면 보일 흰 배경 */
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 5; 
  background: black;
  display: ${(props) => (props.isEnded ? "none" : "block")};
`;

const HeroSection = styled.main`
  display: flex;
  width: 740px;
  padding: 0 2px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  position: relative;
  z-index: 2;
  height: 100%;
  opacity: ${(props) => (props.showContent ? 1 : 0)};
  transition: opacity 1s ease-in;

  @media (min-width: 1921px) {
    width: 920px;
    margin-left: 40px;
  }
  @media (max-width: 1440px) {
    width: 780px;
    margin-left: 28px;
  }
  @media (max-width: 1024px) {
    width: 560px;
  }
`;
const HeroTitle = styled.h1`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: clamp(24px, 6vw, 76px);
  font-weight: 700;
  line-height: 1.1;
`;

const HeroSub = styled.p`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: clamp(12px, 3.2vw, 26px);
  font-weight: 500;
  line-height: 1.3;
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
  transition: all 0.5s ease;
  &:hover {
    background-color: #fe9c32;
    color: white;
    border: 2px solid white;
  }
`;

const DownArrow = styled.img`
  opacity: 0.8;
  width: 38px;
  position: relative;
  z-index: 3;
`;

// =========== 컴포넌트 시작 ===========

function Navbar({ setLogin }) {
  const navigate = (path) => {
    window.location.href = path;
  };
  
  return (
    <Header>
      <LogoBox onClick={() => navigate("/")}>GROW MONEY™</LogoBox>
      <NavMenu>
        <button className="Topbutton home" onClick={() => navigate("/login")}>홈</button>
        <button className="Topbutton load" onClick={() => navigate("/login")}>로드맵</button>
        <button className="Topbutton rank" onClick={() => navigate("/login")}>랭킹</button>
        <button className="Topbutton shop" onClick={() => navigate("/login")}>상점</button>
        <button className="Topbutton my" onClick={() => navigate("/login")}>마이프로필</button>
      </NavMenu>
      <UserMenu>
        <button className="login-btn" onClick={() => setLogin(true)}>
          지금배우기
        </button>
      </UserMenu>
    </Header>
  );
}

function Firstmainpages({ setLogin }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const Fall = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <Navbar setLogin={setLogin} />

      <MainFrameContainer className="MainFrame">
        <VideoElement
          src={Main}
          autoPlay
          muted
          playsInline
          isEnded={isVideoEnded}
          onEnded={() => setIsVideoEnded(true)}
        />
        {/* 2. 원래 페이지 내용: 영상이 끝나면 부드럽게 나타남 */}
        <div
          className="maintitle"
          style={{ flex: 1, display: "flex", alignItems: "center" }}
        >
          <HeroSection showContent={isVideoEnded}>
            <HeroTitle>경제공부의 첫 걸음</HeroTitle>
            <HeroSub>GROW MONEY™와 함께</HeroSub>
            <HeroButton onClick={() => setLogin(true)}>
              <p
                className="Start"
                style={{ fontSize: "clamp(10px, 2vw, 26px)", margin: 0 }}
              >
                시작하기
              </p>
            </HeroButton>
          </HeroSection>
        </div>

        <div
          className="Down"
          style={{ paddingBottom: "30px", textAlign: "center" }}
        >
          {isVideoEnded && (
            <DownArrow src={downArrowSvg} alt="아래로 이동" onClick={Fall} />
          )}
        </div>
      </MainFrameContainer>
    </Container>
  );
}

export default Firstmainpages;
