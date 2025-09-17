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
  height: 73px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 로고 영역
const LogoBox = styled.div`
  color: #fff;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 28px;
`;

// 네비게이션 메뉴
const NavMenu = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 88px;
`;

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
  display: flex;
  width: 740px;
  padding: 0 2px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0px;
  margin: 0px;
`;

const HeroTitle = styled.h1`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const HeroSub = styled.p`
  color: #222;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const HeroButton = styled.button`
  display: flex;
  width: 180px;
  height: 58px;
  padding: 1px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 2px solid #fe9c32;
  background: #fff;
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
          <HeroButton>
            <p className="Start">시작하기</p>
          </HeroButton>
        </HeroSection>
      </div>
    </Container>
  );
}

export default Firstmainpages;
