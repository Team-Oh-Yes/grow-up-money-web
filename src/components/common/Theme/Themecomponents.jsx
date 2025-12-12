import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Big, Mobilestate } from "../../../atoms";
import BigBlocker from "../../../BigBlocker";
import arrow from "../../../img/arrow_back_ios_new.png";
import MobileBlocker from "../../../MobileBlocker";
import "../../css/Loginmainpagescss/Theme.css";
import TamaP from "./TamaP";
import Tamatitle from "./Tamatitle";
function Themecomponents() {
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
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
  if (isMobileBlocked) {
    return <MobileBlocker />;
  }
  if (isExtraLargeScreen) {
    return <BigBlocker />;
  }
  const { id } = useParams();
  const navigate = useNavigate();
  const original_string = id;
  const result = original_string.replace("theme", "");
  let n = [];
  if (id === "theme1") {
    n = [
      "경제 속 숨은 주인공들",
      "내 지갑은 왜 항상 텅텅\n 비어있을까?",
      "치킨? 떡볶이? 하나만\n 골라야 하는 이유",
      "한정판 라부부가 미친듯이\n 비싸진 진짜 이유",
      "내 하루가 경제 뉴스랑 \n 연결돼 있다고?",
    ];
  } else if (id === "theme2") {
    // == 대신 === 사용
    n = [
      "용돈 그냥 쓰면",
      "금방 사라지는이유",
      "나는 돈을 어디에 쓰는 \n스타일일까?",
      "충동구매 방지 꿀팁",
      "명절에 부모님께 용돈\n 안 뺏기는 법",
      "프로 돈 관리자가 되는 첫걸음",
    ];
  } else if (id === "theme3") {
    n = [
      "은행은 우리 돈을\n 그냥 보관만 할까?",
      "적금 vs 예금\n 뭐가 더 이득?",
      "이자 덕분에 돈이 스스로\n 불어나는 마법",
      "신용점수 낮으면 나중에 \n무슨 일이 생길까?",
      "청소년이 자주 당하는\n 금융 사기 피하는 법",
    ];
  } else if (id === "theme4") {
    n = [
      "투자는 돈 있는 어른들만\n 하는 거라고? ",
      "주식, 진짜 사면 내 돈이\n 회사에 들어가는 거야?",
      "비트코인? 무턱대고 \n투자했다가 손해볼 수 있어",
      "인생한방\n '몰빵 투자'가 위험한 이유",
      "도박과 투자의 한 끗 차이",
    ];
  } else if (id === "theme5") {
    n = [
      "중-고등학생도\n 돈 벌 수 있다고?",
      "최저임금은 뭐고\n 주휴수당은 뭐야?",
      "알바 계약서 안 쓰면 \n생길 수 있는 문제들",
      "건강보험, 알바할 때도 \n적용되나?",
      " 내 권리를 지키는 꿀팁",
    ];
  } else if (id === "theme6") {
    n = [
      "세금은 왜 내야 하는 거야?",
      "세금은 어떻게 걷히고\n 어디에 쓰이는 걸까?",
      "국민연금\n 우리는 돌려받을 수 있을까?",
      "경제적 약자를 돕는 제도들",
      "세금이 돌아오는 순간들",
    ];
  } else if (id === "theme7") {
    n = [
      "내 아이디어로 창업 가능",
      "청소년 사업자등록\n 진짜로 할 수 있나?",
      "내가 만든 그림, 영상이 \n내 것인 이유",
      "SNS로 돈 버는 구조\n 100만 인플루언서되기",
      "돈도 벌고 세상도 바꾸는 \n'사회적 기업'",
    ];
  } else if (id === "theme8") {
    n = [
      "집에도 종류가 이렇게 \n많다고?",
      "전세 vs 월세 \n뭐가 더 좋은 거야?",
      "집 계약할 때 꼭 해야하는 \n3가지",
      "집값이 갑자기 \n오르락내리락하는 이유",
      "청소년, 청년 주거 지원 제도",
    ];
  } else if (id === "theme9") {
    n = [
      "우리나라가 다른 나라랑 \n물건을 주고받는 이유",
      "달러·엔화·유로, 왜 환율이 \n바뀌는 거야?",
      "해외 직구가 \n싸졌다 비싸졌다 하는 이유",
      "세계 경제 사건이 나한테\n 영향 주는 순간",
      "지구촌이 함께 잘 사는 방법",
    ];
  } else if (id === "theme10") {
    n = [
      "환경을 지키는 게 \n왜 경제랑 연결돼?",
      "쓰레기를 \n돈으로 바꾸는 방법",
      "에코백·텀블러가 \n만드는 작은 변화",
      "기업도 환경을 \n신경 써야 하는 이유",
      "미래에 뜰 직업은 무엇일까?",
    ];
  }

  return (
    <div className="tama">
      <div className={`First${result} ho`}>
        <Tamatitle n={result} m={1} />
        <TamaP n={n[0]} />
        <Button d={1} />
      </div>
      <div className={`Second${result} ho`}>
        <Tamatitle n={result} m={2} />
        <TamaP n={n[1]} />
        <Button d={2} />
      </div>
      <div className={`Third${result} ho`}>
        <Tamatitle n={result} m={3} />
        <TamaP n={n[2]} />
        <Button d={3} />
      </div>
      <div className={`Fouth${result} ho`}>
        <Tamatitle n={result} m={4} />
        <TamaP n={n[3]} />
        <Button d={4} />
      </div>
      <div className={`Fifth${result} ho`}>
        <Tamatitle n={result} m={5} />
        <TamaP n={n[4]} />
        <Button d={5} />
      </div>
      {result === "10" ? ( // == 대신 === 사용
        ""
      ) : (
        <div
          className="nexttama"
          onClick={() => navigate(`/roadmap/theme${parseInt(result) + 1}`)}
        >
          <div className={`nextcon${result} ho1`}>
            <p>다음테마로 가기</p>{" "}
            <img className="nextarrow" src={arrow} alt="arrow" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Themecomponents;

function Button(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="choice">
      <button
        className="learn"
        onClick={() => navigate(`/roadmap/${id}/unit${props.d}/learn`)}
      >
        학습하기
      </button>
      <button
        className="quiz"
        onClick={() => navigate(`/roadmap/${id}/unit${props.d}/quiz`)}
      >
        퀴즈풀기
      </button>
    </div>
  );
}
