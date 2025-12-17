import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { quizProgressState } from "../../../atoms"; 
import answer from "../../../img/answer.png";
import dia from "../../../img/Icon/basil_diamond-solid.png";
import nanswer from "../../../img/nanswer.png";
import cream from "../../../img/NFT/cream.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/loadmapcss/Quiz.css";

function Quiz() {
  const navigate = useNavigate();
  const { i, d } = useParams();
  
  // 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useRecoilState(quizProgressState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverResponse, setServerResponse] = useState(null);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  
  // 하트 부족 상태 추가
  const [isHeartEmpty, setIsHeartEmpty] = useState(false);

  // URL 파라미터 파싱
  const themeIdString = i || "";
  const themeNumberString = themeIdString.replace("theme", "");
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");

  // 1. 퀴즈 데이터 로드 (GET)
  useEffect(() => {
    if (themeNumberString && unitFreeString) {
      axiosInstance
        .get(`/roadmap/theme/${parseInt(themeNumberString)}/unit/${parseInt(unitFreeString)}/quiz`)
        .then((response) => {
          setQuizData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("퀴즈 데이터 로드 실패:", error);
          setIsLoading(false);
        });
    }
  }, [themeNumberString, unitFreeString]);

  // 2. 스페이스바 다음 문제 이동
  const handleSpacebarPress = (event) => {
    if (
      quizData &&
      currentQuestionIndex < quizData.questions.length &&
      (event.key === " " || event.key === "Spacebar") &&
      isAnswered &&
      !isSubmittingAnswer &&
      !isHeartEmpty // 하트가 없을 땐 작동 방지
    ) {
      event.preventDefault();
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setServerResponse(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => window.removeEventListener("keydown", handleSpacebarPress);
  }, [quizData, currentQuestionIndex, isAnswered, isSubmittingAnswer, isHeartEmpty]);

  // 3. 초기화
  useEffect(() => {
    if (!isInitialized && quizData) {
      setCurrentQuestionIndex(0);
      setScore(0);
      setProgress((prev) => ({
        ...prev,
        TF: false,
        score: 0,
        totalQuestions: quizData.questions.length,
      }));
      setIsInitialized(true);
    }
  }, [quizData, isInitialized, setProgress]);

  // 4. 네비게이션 함수
  const handleContinue = () => navigate(`/roadmap/${i}/unit${parseInt(unitFreeString) + 1}/learn`);
  const handleStop = () => navigate("/roadmap");

  // 5. 정답 선택 및 서버 제출 (핵심 수정 부분)
  const handleAnswerClick = (selectedOption, selectedIndex) => {
    if (isAnswered || !quizData || isSubmittingAnswer || isHeartEmpty) return;

    setIsAnswered(true);
    setIsSubmittingAnswer(true);
    setSelectedAnswer(selectedOption);

    const quizId = currentQuestionIndex + 1; 
    const payload = {
      answer: (selectedIndex + 1).toString(),
    };

    axiosInstance
      .post(`/roadmap/quiz/${quizId}/answer`, payload)
      .then((response) => {
        setServerResponse(response.data);
        if (response.data.isCorrect) {
          setScore((prev) => prev + 1);
        }
        setIsSubmittingAnswer(false);
      })
      .catch((error) => {
        // 서버 응답 에러 핸들링 (402 하트 부족)
        if (error.response && error.response.status === 402) {
          console.log("하트 부족 감지:", error.response.data.detail);
          setIsHeartEmpty(true);
        } else {
          console.error("기타 API 오류:", error);
        }
        setIsSubmittingAnswer(false);
      });
  };

  // ------------------------- 조건부 렌더링 -------------------------

  // 1. 로딩 화면
  if (isLoading) {
    return (
      <div className="Qmaincon">
        <div className="Tcon"><div className="Qcon"><p>퀴즈를 불러오는 중...</p></div></div>
      </div>
    );
  }

  // 2. 하트 부족 화면 (수정된 부분)
  if (isHeartEmpty) {
    return (
      <div className="rqCcon">
        <div className="rqrealcon">
          <img src={cream} className="igotp" alt="크림" />
          <div className="rqcbox">
            <button className="rgo">
              <img src={dia} alt="다이아몬드" />
              하트구매하기
            </button>
            <button className="rstop" onClick={handleStop}>
              학습 그만하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. 퀴즈 완료 화면
  if (quizData && currentQuestionIndex >= quizData.questions.length) {
    return (
      <div className="learncon">
        <div className="gostop">
          <img src={cream} className="cream" alt="크림" />
          <div className="chose">
            <p className="result-text">
              <span className="score">{score}</span>개 맞추셨어요
            </p>
            <div className="qcbox">
              <button className="rego" onClick={handleContinue}>학습 하러가기</button>
              <button className="restop" onClick={handleStop}>그만하기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. 일반 퀴즈 풀이 화면
  const currentQuiz = quizData.questions[currentQuestionIndex];

  return (
    <div className="Qmaincon">
      <div className="Tcon">
        <div className="Qcon">
          <p>{currentQuestionIndex + 1}. {currentQuiz.stem}</p>
          <div className="skip">
            {isSubmittingAnswer ? (
              <p>정답을 확인하는 중입니다...</p>
            ) : isAnswered ? (
              <p>{"<Space Bar>를 눌러 다음 문제로 넘어가세요"}</p>
            ) : (
              <p>답을 선택해 주세요</p>
            )}
          </div>
        </div>
      </div>
      <div className="Acon">
        {currentQuiz.options.map((option, index) => {
          let buttonClass = "AC";
          let imgSrc = null;

          if (isAnswered && serverResponse) {
            const correctIndex = parseInt(serverResponse.correctAnswer) - 1;
            if (option === selectedAnswer) {
              if (serverResponse.isCorrect) {
                buttonClass += " TAC";
                imgSrc = answer;
              } else {
                buttonClass += " FAC";
                imgSrc = nanswer;
              }
            }
            if (!serverResponse.isCorrect && index === correctIndex) {
              buttonClass += " TAC_show_correct";
            }
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerClick(option, index)}
              disabled={isAnswered || isSubmittingAnswer}
            >
              {imgSrc && <img src={imgSrc} alt="icon" />}
              <p className="QA">{option}</p>
              {imgSrc && <img src={imgSrc} alt="icon" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;