import { useNavigate } from "react-router-dom";
import "../../css/Loginmainpagescss/Loginmainpages.css";
import TamaP from "./TamaP";
import Tamatitle from "./Tamatitle";
function MainTheme() {
  const navigate = useNavigate();
  return (
    <div className="tama">
      <div className="First ho" onClick={() => navigate("/login/1")}>
        <Tamatitle n={1} />
        <TamaP n={"경제의 문을 열다"} />
      </div>
      <div className="Second ho" onClick={() => navigate("/login/2")}>
        <Tamatitle n={2} />
        <TamaP n={"내 돈의 흐름 이해하기"} />
      </div>
      <div className="Third ho" onClick={() => navigate("/login/3")}>
        <Tamatitle n={3} />
        <TamaP n={"금융 기초와 은행 생활"} />
      </div>
      <div className="Fouth ho" onClick={() => navigate("/login/4")}>
        <Tamatitle n={4} />
        <TamaP n={"투자자 따라잡기"} />
      </div>
      <div className="Fifth ho" onClick={() => navigate("/login/5")}>
        <Tamatitle n={5} />
        <TamaP n={"일하고 돈 벌기"} />
      </div>
      <div className="Sixth ho" onClick={() => navigate("/login/6")}>
        <Tamatitle n={6} />
        <TamaP n={"세금과 사회"} />
      </div>
      <div className="Seventh ho" onClick={() => navigate("/login/7")}>
        <Tamatitle n={7} />
        <TamaP n={"개인사업자 미리보기"} />
      </div>
      <div className="Eighth ho" onClick={() => navigate("/login/8")}>
        <Tamatitle n={8} />
        <TamaP n={"내 집 마련하기"} />
      </div>
      <div className="Ninth ho" onClick={() => navigate("/login/9")}>
        <Tamatitle n={9} />
        <TamaP n={"세계와 연결되는 우리"} />
      </div>
      <div className="Tenth ho" onClick={() => navigate("/login/10")}>
        <Tamatitle n={10} />
        <TamaP n={"북극곰 구하고,"} m={"우리경제구하기"} />
      </div>
    </div>
  );
}

export default MainTheme;
