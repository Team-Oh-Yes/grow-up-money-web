import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Big, Mobilestate, quizProgressState, Testheart } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import back from "../../../img/Icon/arrow.svg";
import point from "../../../img/Icon/bouncepoint.svg";
import dia from "../../../img/Icon/diamond.svg";
import heart from "../../../img/Icon/heart.svg";
import ticket from "../../../img/Icon/ticket.svg";
import map from "../../../img/Side-top-bar/home.svg";
import more from "../../../img/Side-top-bar/more.svg";
import rank from "../../../img/Side-top-bar/ranking.svg";
import store from "../../../img/Side-top-bar/shop.svg";
import trade from "../../../img/Side-top-bar/trade.svg";
import pro from "../../../img/Side-top-bar/user.svg";
import MobileBlocker from "../../../MobileBlocker";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import * as S from "../../styled/top&sidebar";
import Learn from "../Loadmapcomponents/Learn";

function Loginmaincomponents() {
  const [testheart, setTestheart] = useRecoilState(Testheart);
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("box1");
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const [show, setShow] = useRecoilState(quizProgressState);
  const { TF, score, totalQuestions } = show;

  const [data, setData] = useState(null);

  // 경로 판별 변수
  const Roadmap = location.pathname.includes("/roadmap");
  const Rank = location.pathname.includes("/ranking");
  const Trade = location.pathname.includes("/market");
  const Shop = location.pathname.includes("/shop");
  const More = location.pathname.includes("/more");
  const My = location.pathname.includes("/my");
  const Learn = location.pathname.includes("/learn");
  const isQuizPage = location.pathname.includes("/quiz");

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

  // 사이드바 active 상태 관리
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/roadmap")) setActive("box1");
    else if (path.includes("/ranking")) setActive("box2");
    else if (path.includes("/market")) setActive("box3");
    else if (path.includes("/shop")) setActive("box4");
    else if (path.includes("/my")) setActive("box5");
    else if (path.includes("/more")) setActive("box6");
  }, [location.pathname]);

  // 유저 정보 로드
  useEffect(() => {
    axiosInstance
      .get("/me")
      .then((response) => {
        setData(response.data);
        if (response.data.hearts !== undefined) {
          setTestheart(response.data.hearts);
        }
      })
      .catch((error) => console.error("데이터 로드 에러:", error));
  }, [setTestheart]);

  // 퀴즈 페이지 아닐 때 progress 초기화
  useEffect(() => {
    if (!isQuizPage && TF) {
      setShow({
        TF: false,
        score: 0,
        totalQuestions: 0,
      });
    }
  }, [isQuizPage, TF, setShow]);

  // 화면 크기 리스너
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
          <div className="topbar-left-content">
            {isQuizPage || Learn ? (
              <div className="b" onClick={() => navigate("/roadmap")}>
                <img src={back} alt="back" />
              </div>
            ) : (
              <div className="top-title-text">
                {Roadmap && "로드맵"}
                {Rank && "랭킹"}
                {Trade && "거래소"}
                {Shop && "상점"}
                {My && "마이페이지"}
                {More && "더보기"}
              </div>
            )}
          </div>

          <div className="topbar-progress-container">
            {isQuizPage && TF && (
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
              <div className="case">
                <img src={heart} alt="하트" />
                <h5>{formatNumber(testheart)}</h5>
              </div>
              <div className="case">
                <img src={dia} alt="다이아" />
                <h5>{formatNumber(data?.pointBalance ?? 0)}</h5>
              </div>
              <div className="case">
                <img src={point} alt="포인트" />
                <h5>{formatNumber(data?.boundPoint ?? 0)}</h5>
              </div>
              <div className="case">
                <img src={ticket} alt="티켓" />
                <h5>5</h5>
              </div>
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
