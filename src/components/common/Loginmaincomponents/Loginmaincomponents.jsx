import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { Big, Mobilestate, quizProgressState, Testheart } from "../../../atoms";

// Components
import BigBlocker from "../../../BigBlocker";
import MobileBlocker from "../../../MobileBlocker";
import * as S from "../../styled/top&sidebar";

// Images
import back from "../../../img/back.png";
import king from "../../../img/crown.png";
import ticket from "../../../img/gacha2.png";
import heart from "../../../img/heart.png";
import map from "../../../img/loadmap.png";
import more from "../../../img/more.png";
import dia from "../../../img/point.png";
import pro from "../../../img/profile.png";
import rank from "../../../img/rank.png";
import store from "../../../img/store.png";
import trade from "../../../img/trade.png";

// CSS
import "../../css/Loginmainpagescss/Loginmainpages.css";

// 사이드바 메뉴 데이터
const MENU_ITEMS = [
  { id: "box1", path: "/roadmap", icon: map, label: "로드맵" },
  { id: "box2", path: "/rank", icon: rank, label: "랭킹" },
  { id: "box3", path: "/market", icon: trade, label: "거래소" },
  { id: "box4", path: "/shop", icon: store, label: "상점" },
  { id: "box5", path: "/my", icon: pro, label: "마이페이지" },
  { id: "box6", path: "/more", icon: more, label: "더보기" },
];

function Loginmaincomponents() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States
  const [active, setActive] = useState("box1");
  const [testheart] = useRecoilState(Testheart);
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const [quizProgress, setQuizProgress] = useRecoilState(quizProgressState);
  
  const { TF, score, totalQuestions } = quizProgress;

  // 현재 경로에 따라 활성 메뉴 설정
  useEffect(() => {
    const currentMenu = MENU_ITEMS.find(item => 
      location.pathname.includes(item.path.slice(1))
    );
    if (currentMenu) setActive(currentMenu.id);
  }, [location.pathname]);

  // 로그인 성공 토스트
  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("로그인 성공!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileBlocked(width < 768);
      setIsExtraLargeScreen(width >= 3200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileBlocked, setIsExtraLargeScreen]);

  // 퀴즈 진행 상태 관리
  useEffect(() => {
    const isQuizPath = location.pathname.includes("/quiz");
    
    if (isQuizPath && !TF) {
      setQuizProgress(prev => ({ ...prev, TF: true }));
    } else if (!isQuizPath && TF) {
      setQuizProgress({ TF: false, score: 0, totalQuestions: 4 });
    }
  }, [location.pathname, TF, setQuizProgress]);

  // 퀴즈 완료 시 점수 리셋
  useEffect(() => {
    const isQuizPath = location.pathname.includes("/quiz");
    if (isQuizPath && TF && totalQuestions > 0 && score === totalQuestions) {
      setTimeout(() => setQuizProgress(prev => ({ ...prev, score: 0 })), 1500);
    }
  }, [score, totalQuestions, TF, location.pathname, setQuizProgress]);

  // 화면 차단 처리
  if (isMobileBlocked) return <MobileBlocker />;
  if (isExtraLargeScreen) return <BigBlocker />;

  // 메뉴 클릭 핸들러
  const handleMenuClick = (id, path) => {
    setActive(id);
    navigate(path);
  };

  // 퀴즈 진행률 계산
  const progressPercentage = TF && totalQuestions > 0 
    ? (score / totalQuestions) * 100 
    : 0;

  return (
    <div className="maincon">
      {/* 사이드바 */}
      <S.Sidebar>
        <p className="title">Grow Money</p>
        <div className="con">
          {MENU_ITEMS.map(({ id, path, icon, label }) => (
            <div
              key={id}
              className={active === id ? "boxactive" : "box"}
              onClick={() => handleMenuClick(id, path)}
            >
              <img src={icon} alt={label} />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </S.Sidebar>

      {/* 메인 콘텐츠 */}
      <div className="changebox">
        <S.Topbar>
          <div className="b" onClick={() => navigate("/roadmap")}>
            <img src={back} alt="뒤로가기" />
          </div>
          
          {/* 퀴즈 진행 바 */}
          <div className="topbar-progress-container">
            {TF && (
              <div className="topbar-progress-background">
                <div
                  className="topbar-progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}
          </div>

          {/* 상단 우측 아이콘 */}
          <div className="rcon">
            <div className="img">
              <img src={heart} alt="하트" />
              <h5>{testheart}</h5>
              <img src={dia} alt="다이아몬드" />
              <h5>5</h5>
              <img src={ticket} alt="티켓" />
              <h5>5</h5>
              <img src={king} alt="프리미엄" />
              <h5 className="premiun">Premium</h5>
            </div>
          </div>
        </S.Topbar>

        <div className="mainbox">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Loginmaincomponents;
