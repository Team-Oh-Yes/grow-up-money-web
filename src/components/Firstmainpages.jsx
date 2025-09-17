import styled from "styled-components";
import "./Fistmainpaged.css";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// ===== Navbar =====
const Navbar = styled.header`
  height: 80px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 로고 영역
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: bold;
  font-size: 24px;
  margin-left: 28px;
`;

// 네비게이션 메뉴
const NavMenu = styled.nav`
  display: flex;
  gap: 60px;
`

// 유저 메뉴
const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .bell {
    position: relative;
    font-size: 22px;
    cursor: pointer;

    &::after {
      content: "1";
      position: absolute;
      top: -6px;
      right: -8px;
      background: #2196f3;
      color: #fff;
      font-size: 12px;
      width: 20px;
      height: 20px;
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
    height: 36px;
    min-width: 100px;
    margin-right: 28px;
    font-size: 20px;
    font-weight: bold;
  }
`;

// ===== Hero Section =====
const HeroSection = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
`;

const HeroSub = styled.p`
  font-size: 18px;
  margin-top: 0px;
  margin-left: 5px;
`;

const HeroButton = styled.button`
  background: white;
  border: 2px solid #ff6600;
  color: #ff6600;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  height: 52px;
  min-width: 160px;

  &:hover {
    background: #fff5f0;
  }
`;

// ===== Main Component =====
function Firstmainpages() {
  return (
    <Container>
      <Navbar>
        <LogoBox>GROWupMONEY</LogoBox>

        <NavMenu>
          <button href="#" className="Topbutton">
            프로그램 정보
          </button>
          <button href="#" className="Topbutton">
            미디어
          </button>
          <button href="#" className="Topbutton">
            소식
          </button>
          <button href="#" className="Topbutton">
            고객지원
          </button>
          <button href="#" className="Topbutton">
            소셜미디어
          </button>
        </NavMenu>

        <UserMenu>
          <button className="login-btn">로그인</button>
        </UserMenu>
      </Navbar>
      <div className="maintitle">
        <HeroSection>
          <HeroTitle>경제공부의 첫 걸음</HeroTitle>
          <HeroSub>GROW UP MONEY와 함께</HeroSub>
          <HeroButton>시작하기</HeroButton>
        </HeroSection>
      </div>
    </Container>
  );
}

export default Firstmainpages;
