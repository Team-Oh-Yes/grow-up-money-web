import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rtwo from "../../../img/NFT/loadone.svg";
import rthree from "../../../img/NFT/cat.svg";
import rfive from "../../../img/NFT/road5.svg";
import rone from "../../../img/Ranking/leftImg.svg";
import rfour from "../../../img/NFT/roadmap.svg";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import TamaP from "./TamaP";
import Tamatitle from "./Tamatitle";

function MainTheme() {
  const location = useLocation();
  const navigate = useNavigate();

  const toastOptions = (time = 2000) => ({
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "light",
  });

  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("로그인 성공!", toastOptions(2000));
      toast.clearWaitingQueue();
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  return (
    <div className="tama">
      <div className="First ho" onClick={() => navigate("/roadmap/theme1")}>
        <Tamatitle n={1} />
        <TamaP n={"경제의 문을 열다"} />
        <img src={rone} className="sp1"></img>
      </div>
      <div className="Second ho" onClick={() => navigate("/roadmap/theme2")}>
        <Tamatitle n={2} />
        <TamaP n={"내 돈의 흐름 이해하기"} />
        <img src={rtwo} className="sp2"></img>
      </div>
      <div className="Third ho" onClick={() => navigate("/roadmap/theme3")}>
        <Tamatitle n={3} />
        <TamaP n={"금융 기초와 은행 생활"} />
        <img src={rthree} className="sp3"></img>
      </div>
      <div className="Fouth ho" onClick={() => navigate("/roadmap/theme4")}>
        <Tamatitle n={4} />
        <TamaP n={"투자자 따라잡기"} />
        <img src={rfour} className="sp4"></img>
      </div>
      <div className="Fifth ho" onClick={() => navigate("/roadmap/theme5")}>
        <Tamatitle n={5} />
        <TamaP n={"일하고 돈 벌기"} />
        <img src={rfive} className="sp5"></img>
      </div>
      <div className="Sixth ho" onClick={() => navigate("/roadmap/theme6")}>
        <Tamatitle n={6} />
        <TamaP n={"세금과 사회"} />
        <img src={rfive} className="sp5"></img>
      </div>
      <div className="Seventh ho" onClick={() => navigate("/roadmap/theme7")}>
        <Tamatitle n={7} />
        <TamaP n={"개인사업자 미리보기"} />
        <img src={rfive} className="sp5"></img>
      </div>
      <div className="Eighth ho" onClick={() => navigate("/roadmap/theme8")}>
        <Tamatitle n={8} />
        <TamaP n={"내 집 마련하기"} />
        <img src={rfive} className="sp5"></img>
      </div>
      <div className="Ninth ho" onClick={() => navigate("/roadmap/theme9")}>
        <Tamatitle n={9} />
        <TamaP n={"세계와 연결되는 우리"} />
        <img src={rfive} className="sp5"></img>
      </div>
      <div className="Tenth ho" onClick={() => navigate("/roadmap/theme10")}>
        <Tamatitle n={10} />
        <TamaP n={"북극곰 구하고,\n우리경제구하기"} />
        <img src={rfive} className="sp5"></img>
      </div>
    </div>
  );
}

export default MainTheme;
