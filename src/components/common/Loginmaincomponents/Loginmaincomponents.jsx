import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Big, Mobilestate, quizProgressState, Testheart } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import back from "../../../img/Icon/arrow.svg";
import ticket from "../../../img/Icon/ticket.svg";
import heart from "../../../img/Icon/heart.svg";
import point from "../../../img/Icon/bouncepoint.svg";
import map from "../../../img/Side-top-bar/home.svg";
import more from "../../../img/Side-top-bar/more.svg";
import dia from "../../../img/Icon/diamond.svg";
import pro from "../../../img/Side-top-bar/user.svg";
import rank from "../../../img/Side-top-bar/ranking.svg";
import store from "../../../img/Side-top-bar/shop.svg";
import trade from "../../../img/Side-top-bar/trade.svg";
import MobileBlocker from "../../../MobileBlocker";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import * as S from "../../styled/top&sidebar";

function Loginmaincomponents() {
  const [testheart, setTestheart] = useRecoilState(Testheart); // ✨ 실시간 하트 상태 구독
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("box1");
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const [show, setShow] = useRecoilState(quizProgressState);
  const { TF, score, totalQuestions } = show;

  const [data, setData] = useState(null);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    const number = Number(num);
    if (isNaN(number)) return String(num);
    if (number >= 1000000)
      return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (number >= 1000)
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return number.toString();
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/roadmap")) setActive("box1");
    else if (path.includes("/ranking")) setActive("box2");
    else if (path.includes("/market")) setActive("box3");
    else if (path.includes("/shop")) setActive("box4");
    else if (path.includes("/my")) setActive("box5");
    else if (path.includes("/more")) setActive("box6");
  }, [location.pathname]);

  useEffect(() => {
    axiosInstance
      .get("/me")
      .then((response) => {
        setData(response.data);
        // ✨ 최초 로드 시 서버 하트 값을 Recoil에 저장하여 모든 컴포넌트 동기화
        if (response.data.hearts !== undefined) {
          setTestheart(response.data.hearts);
        }
      })
      .catch((error) => console.error("데이터 로드 에러:", error));
  }, [setTestheart]);

  // 화면 리사이즈 및 퀴즈 프로그레스 로직 생략 (기존과 동일)
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

  if (isMobileBlocked) return <MobileBlocker />;
  if (isExtraLargeScreen) return <BigBlocker />;

  const Action = (e, n) => {
    setActive(e);
    navigate(n);
  };
  const safeProgressPercentage = TF ? (score / totalQuestions) * 100 || 0 : 0;

  return (
    <div className="maincon">
      <S.Sidebar>
        <p className="title">Grow Money</p>
        <div className="con">
          <div
            className={active === "box1" ? "boxactive" : "box"}
            onClick={() => Action("box1", "/roadmap")}
          >
            <img src={map} alt="map" />
            <p>로드맵</p>
          </div>
          <div
            className={active === "box2" ? "boxactive" : "box"}
            onClick={() => Action("box2", "/ranking")}
          >
            <img src={rank} alt="rank" />
            <p>랭킹</p>
          </div>
          <div
            className={active === "box3" ? "boxactive" : "box"}
            onClick={() => Action("box3", "/market")}
          >
            <img src={trade} alt="trade" />
            <p>거래소</p>
          </div>
          <div
            className={active === "box4" ? "boxactive" : "box"}
            onClick={() => Action("box4", "/shop")}
          >
            <img src={store} alt="store" />
            <p>상점</p>
          </div>
          <div
            className={active === "box5" ? "boxactive" : "box"}
            onClick={() => Action("box5", "/my")}
          >
            <img src={pro} alt="pro" />
            <p>마이페이지</p>
          </div>
          <div
            className={active === "box6" ? "boxactive" : "box"}
            onClick={() => Action("box6", "/more")}
          >
            <img src={more} alt="more" />
            <p>더보기</p>
          </div>
        </div>
      </S.Sidebar>
      <div className="changebox">
        <S.Topbar>
          <div className="b" onClick={() => navigate("/roadmap")}>
            <img src={back} alt="back" />
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
              <img src={heart} alt="하트" />
              {/* ✨ data.hearts 대신 실시간 상태인 testheart 사용 */}
              <h5>{formatNumber(testheart)}</h5>

              <img src={dia} alt="다이아" />
              <h5>{formatNumber(data?.pointBalance ?? 0)}</h5>

              <img src={point} alt="포인트" />
              <h5>{formatNumber(data?.boundPoint ?? 0)}</h5>

              <img src={ticket} alt="티켓" />
              <h5>5</h5>
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
