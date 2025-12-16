import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { Big, Mobilestate, quizProgressState, Testheart } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import back from "../../../img/back.png";
import king from "../../../img/crown.png";
import ticket from "../../../img/gacha2.png";
import heart from "../../../img/heart.png";
import point from "../../../img/Icon/bouncepoint.svg";
import map from "../../../img/loadmap.png";
import more from "../../../img/more.png";
import dia from "../../../img/point.png";
import pro from "../../../img/profile.png";
import rank from "../../../img/rank.png";
import store from "../../../img/store.png";
import trade from "../../../img/trade.png";
import MobileBlocker from "../../../MobileBlocker";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import * as S from "../../styled/top&sidebar";

function Loginmaincomponents() {
  const [testheart, setTestheart] = useRecoilState(Testheart);
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
  const [data, setData] = useState(null);

  // ✨ 숫자를 k, m 형식으로 포맷팅하는 함수
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    const number = Number(num);

    if (isNaN(number)) return String(num);

    if (number >= 1000000) {
      // 100만 이상: M (예: 1.5M)
      return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (number >= 1000) {
      // 1천 이상: k (예: 1.2k, 10k)
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return number.toString();
  };
  // ----------------------------------------------------

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/roadmap")) {
      setActive("box1");
    } else if (path.includes("/rank")) {
      setActive("box2");
    } else if (path.includes("/market")) {
      setActive("box3");
    } else if (path.includes("/shop")) {
      setActive("box4");
    } else if (path.includes("/my")) {
      setActive("box5");
    } else if (path.includes("/more")) {
      setActive("box6");
    }
  }, [location.pathname]);

  //현수야고침
  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("로그인 성공!", { ...toastcode(2000) });
      toast.clearWaitingQueue();

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobileBlocked(width < 768);
        setIsExtraLargeScreen(width >= 3200);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileBlocked, setIsExtraLargeScreen]);

  // ✨ API 호출을 마운트 시 한 번만 실행하도록 수정 (location 의존성 제거)
  useEffect(() => {
    axiosInstance
      .get("/me")
      .then((response) => {
        setData(response.data);
        console.log("사용자 데이터 로드 성공:", response.data);
      })
      .catch((error) => {
        console.error("하트시스템호출 에러:", error);
      });
  }, []); // 👈 의존성 배열을 빈 배열 []로 수정하여 마운트 시 1회만 호출되도록 변경했습니다.

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
        <p className="title">Grow Money</p>
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
            onClick={() => Action("box3", "/market")}
          >
            <img src={trade} alt="거래소 이미지"></img>
            <p>거래소</p>
          </div>
          <div
            className={active === "box4" ? "boxactive" : "box"}
            onClick={() => Action("box4", "/shop")}
          >
            <img src={store} alt="스토어 이미지"></img>
            <p>상점</p>
          </div>
          <div
            className={active === "box5" ? "boxactive" : "box"}
            onClick={() => Action("box5", "/my")}
          >
            <img src={pro} alt="프로필 이미지"></img>
            <p>마이페이지</p>
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
          <div className="b" onClick={() => navigate("/roadmap")}>
            <img src={back} alt="뒤로가기"></img>
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
              {/* data가 null일 때 0을 반환하도록 옵셔널 체이닝 적용 */}
              <h5>{formatNumber(data?.hearts ?? 0)}</h5>

              <img src={dia} alt="다이아몬드"></img>
              {/* data가 null일 때 0을 반환하도록 옵셔널 체이닝 적용 */}
              <h5>{formatNumber(data?.pointBalance ?? 0)}</h5>

              <img src={point} alt="포인트"></img>
              {/* data가 null일 때 0을 반환하도록 옵셔널 체이닝 적용 */}
              <h5>{formatNumber(data?.boundPoint ?? 0)}</h5>

              <img src={ticket} alt="티켓" />
              <h5>5</h5>
              <img src={king} alt="왕관"></img>
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
