import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Big, Mobilestate, quizProgressState } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import back from "../../../img/back.png";
import trade from "../../../img/거래소.png";
import dia from "../../../img/point.png";
import more from "../../../img/more.png";
import rank from "../../../img/rank.png";
import map from "../../../img/loadmap.png";
import store from "../../../img/store.png";
import king from "../../../img/crown.png";
import ticket from "../../../img/gacha2.png";
import pro from "../../../img/프로필.png";
import heart from "../../../img/heart.png";
import MobileBlocker from "../../../MobileBlocker";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import * as S from "../../styled/top&sidebar";
function Loginmaincomponents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("box1");
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const [show, setShow] = useRecoilState(quizProgressState);
  const { TF, score, totalQuestions } = show;

  const toastcode = (time = 1000) => ({
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "light",
  });

  // 로그인 성공 시 토스트 메시지 표시
  useEffect(() => {
      if (location.state?.loginSuccess) {
          toast.success('로그인 성공!', {...toastcode(2000)});
          toast.clearWaitingQueue();
          
          // state 초기화 (뒤로가기 후 다시 접속 시 메시지 재표시 방지)
          window.history.replaceState({}, document.title);
      }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobileBlocked(width < 768);
        setIsExtraLargeScreen(width >= 2000);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileBlocked, setIsExtraLargeScreen]);

  useEffect(() => {
    const isQuizPath = location.pathname.includes("/quiz");

    if (isQuizPath && !TF) {
      setShow((prev) => ({ ...prev, TF: true }));
    } else if (!isQuizPath && TF) {
      setShow({ TF: false, score: 0, totalQuestions: 4 });
    }
  }, [location.pathname, TF, setShow]);

  useEffect(() => {
    const isQuizPath = location.pathname.includes("/quiz");
    if (isQuizPath && TF && totalQuestions > 0 && score === totalQuestions) {
      setTimeout(() => {
        setShow({ score: 0 });
      }, 1500);
    }
  }, [score, totalQuestions, TF, location.pathname, setShow]);

  if (isMobileBlocked) {
    return <MobileBlocker />;
  }
  if (isExtraLargeScreen) {
    return <BigBlocker />;
  }

  const Action = (e, n) => {
    setActive(e);
    navigate(n);
  };

  // 프로그레스 퍼센트 계산
  const progressPercentage = (score / totalQuestions) * 100;
  const safeProgressPercentage = TF
    ? isNaN(progressPercentage)
      ? 0
      : progressPercentage
    : 0;

  return (
    <div className="maincon">
      <S.Sidebar>
        <p className="title">oh!Yes</p>
        <div className="con">
          <div
            className={active === "box1" ? "boxactive" : "box"}
            onClick={() => Action("box1", "/roadmap")}
          >
            <img src={map} alt="로드맵 이미지"></img>
            <p>로드맵</p>
          </div>
          <div
            className={active === "box2" ? "boxactive" : "box"}
            onClick={() => Action("box2", "/rank")}
          >
            <img src={rank} alt="랭킹 이미지"></img>
            <p>랭킹</p>
          </div>
          <div
            className={active === "box3" ? "boxactive" : "box"}
            onClick={() => Action("box3", "/trade")}
          >
            <img src={trade} alt="거래소 이미지"></img>
            <p>거래소</p>
          </div>
          <div
            className={active === "box4" ? "boxactive" : "box"}
            onClick={() => Action("box4", "main//store")}
          >
            <img src={store} alt="스토어 이미지"></img>
            <p>스토어</p>
          </div>
          <div
            className={active === "box5" ? "boxactive" : "box"}
            onClick={() => Action("box5", "/profile")}
          >
            <img src={pro} alt="프로필 이미지"></img>
            <p>프로필</p>
          </div>
          <div
            className={active === "box6" ? "boxactive" : "box"}
            onClick={() => Action("box6", "/more")}
          >
            <img src={more} alt="더보기 이미지"></img>
            <p>더보기</p>
          </div>
        </div>
      </S.Sidebar>
      <div className="changebox">
        <S.Topbar>
          <div className="b" onClick={()=>navigate('/roadmap')}>
            <img src={back}></img>
          </div>
          <div className="topbar-progress-container">
            {TF && (
              <div className="topbar-progress-background">
                <div
                  className="topbar-progress-bar"
                  style={{ width: `${safeProgressPercentage}%` }}
                />
              </div>
            )}
          </div>
          <div className="rcon">
            <div className="img">
              <img src={heart} alt="하트"></img>
              <h5>5</h5>
              <img src={dia} alt="다이아몬드"></img>
              <h5>5</h5>
              <img src={ticket} alt="티켓" />
              <h5>5</h5>
              <img src={king}></img>
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
