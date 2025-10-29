import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Big, Mobilestate } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import trade from "../../../img/거래소.png";
import dia from "../../../img/다이야2.png";
import more from "../../../img/더보기.png";
import rank from "../../../img/랭킹.png";
import map from "../../../img/로드맵.png";
import store from "../../../img/스토어.png";
import king from "../../../img/왕관.png";
import ticket from "../../../img/티켓2.png";
import pro from "../../../img/프로필.png";
import heart from "../../../img/하트.png";
import MobileBlocker from "../../../MobileBlocker";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import * as S from "../../styled/top&sidebar";

function Loginmaincomponents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("box1");
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobileBlocked(width < 768);
        setIsExtraLargeScreen(width >= 1920);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileBlocked, setIsExtraLargeScreen]);



  if (isMobileBlocked) {
    return <MobileBlocker />;
  }
  if (isExtraLargeScreen) {
    return <BigBlocker />;
  }

  const Action = (e) => {
    setActive(e);
    navigate("/login");
  };

  return (
    <div className="maincon">
      <S.Sidebar>
        <p className="title">oh!Yes</p>
        <div className="con">
          <div
            className={active === "box1" ? "boxactive" : "box"}
            onClick={() => Action("box1")}
          >
            <img src={map} alt="로드맵 이미지"></img>
            <p>로드맵</p>
          </div>
          <div
            className={active === "box2" ? "boxactive" : "box"}
            onClick={() => setActive("box2")}
          >
            <img src={rank} alt="랭킹 이미지"></img>
            <p>랭킹</p>
          </div>
          <div
            className={active === "box3" ? "boxactive" : "box"}
            onClick={() => setActive("box3")}
          >
            <img src={trade} alt="거래소 이미지"></img>
            <p>거래소</p>
          </div>
          <div
            className={active === "box4" ? "boxactive" : "box"}
            onClick={() => setActive("box4")}
          >
            <img src={store} alt="스토어 이미지"></img>
            <p>스토어</p>
          </div>
          <div
            className={active === "box5" ? "boxactive" : "box"}
            onClick={() => setActive("box5")}
          >
            <img src={pro} alt="프로필 이미지"></img>
            <p>프로필</p>
          </div>
          <div
            className={active === "box6" ? "boxactive" : "box"}
            onClick={() => setActive("box6")}
          >
            <img src={more} alt="더보기 이미지"></img>
            <p>더보기</p>
          </div>
        </div>
      </S.Sidebar>
      <div className="changebox">
        <S.Topbar>
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
        </S.Topbar>
        <div className="mainbox">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Loginmaincomponents;
