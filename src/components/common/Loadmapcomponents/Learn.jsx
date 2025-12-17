import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ma from "../../../img/image 11.svg";
import arrow from "../../../img/오른쪽.png";
import axiosInstance from "../../api/axiosInstance";
import "../../css/loadmapcss/learn.css";
import { Ldata } from "../../data/loadmap/learndata";

function Learn() {
  let location = useLocation();
  const [story, setStory] = useState(0);
  const [showChose, setShowChose] = useState(false);
  const { i, d } = useParams();
  const navigate = useNavigate();

  // 1. URL 파라미터 변수를 먼저 정의
  const themeIdString = i || "";
  // const themeNumberString = themeIdString.replace("theme", ""); // 사용되지 않으므로 주석 처리
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");

  // 2. unitFreeString을 사용하여 index와 현재 유닛을 정의
  const unitNumber = parseInt(unitFreeString, 10);
  const index = unitNumber - 1;
  const currentUnit = Ldata[index];

  // 3. 유효성 검사 (currentUnit이 없을 경우 처리)
  if (!currentUnit) {
    // 유효한 unitFreeString이 아니거나 Ldata에 해당 인덱스가 없을 경우
    return (
      <div className="lcon">
        <p>
          학습 데이터를 찾을 수 없습니다. (Unit ID: {unitFreeString || "없음"})
        </p>
        <button onClick={() => navigate("/roadmap")}>로드맵으로 돌아가기</button>
      </div>
    );
  }

  const storyLength = currentUnit.text.length;
  const isLastStory = story === storyLength - 1;

  // 학습 시작 API 호출 (unitNumber를 사용하도록 수정)
  useEffect(() => {
    // unitNumber가 유효한 숫자(NaN이 아님)이고, 0보다 큰 값일 때만 API를 호출하도록 명시적으로 조건 추가
    if (!isNaN(unitNumber) && unitNumber > 0) {
      console.log(`[API CALL] 학습 시작 시도: Unit ${unitNumber}`);
      axiosInstance
        .post(`/roadmap/lesson/${unitNumber}/start`)
        .then((response) => {
          // 성공 로그를 명확하게 출력
          console.log(
            `✅ 학습 시작 API 호출 성공: Unit ${unitNumber}`,
            response
          );
        })
        .catch((error) => {
          console.error(`❌ 학습 시작 API 호출 실패: Unit ${unitNumber}`, error);
        });
    } else {
        // unitNumber가 유효하지 않을 때 콘솔 로그 추가 (디버깅용)
        console.log(`[SKIP] unitNumber가 유효하지 않아 API 호출을 건너뜁니다. (Current unitNumber: ${unitNumber})`);
    }
  }, [unitNumber]); // 의존성 배열에 unitNumber 사용

  const next = () => {
    if (isLastStory) {
      setShowChose(true);
    } else {
      setStory(story + 1);
    }
  };

  const handleContinue = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitNumber}/complete`);
      console.log("✅ 학습 완료 API 호출 성공 (Continue)");
    } catch (error) {
      console.error("❌ 학습 완료 API 호출 실패 (Continue):", error);
    }
    // 다음 유닛으로 이동
    navigate(`/roadmap/${i}/unit${unitNumber}/quiz`);
  };

  const handleStop = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitNumber}/complete`);
      console.log("✅ 학습 완료 API 호출 성공 (Stop)");
    } catch (error) {
      console.error("❌ 학습 완료 API 호출 실패 (Stop):", error);
    }
    navigate("/roadmap");
  };

  return (
    <div className="lcon">
      {showChose ? (
        // 퀴즈/종료 선택 화면
        <div className="Ccon">
          <div className="realcon">
            <div>
              <img src={ma} className="m" alt="character" />
            </div>
            <div className="cbox">
              <button className="go" onClick={handleContinue}>
                퀴즈 풀러가기
              </button>
              <button className="stop" onClick={handleStop}>
                학습 그만하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 스토리 진행 화면
        <>
          <div className="lsubcon">
            <div className="imgcon">
              <img
                // 이미지가 누락되었을 경우를 대비하여 alt 속성을 추가하는 것이 좋습니다.
                src={currentUnit.text[story].img}
                className="random"
                alt="학습 이미지"
              />
            </div>
            <button className="stext" onClick={next}>
              {/* 마스크 이미지에 alt 속성 추가 */}
              <img
                src={currentUnit.text[story].img}
                className="maskort"
                alt="마스크 이미지"
              />
              <div className="textcom">{currentUnit.text[story].real}</div>
            </button>
          </div>
          <button onClick={next} className="next">
            <img src={arrow} alt="다음으로" />
          </button>
        </>
      )}
    </div>
  );
}

export default Learn;