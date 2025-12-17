import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { quizProgressState, Testheart } from "../../../atoms";
import answer from "../../../img/answer.png";
import dia from "../../../img/Icon/basil_diamond-solid.png";
import nanswer from "../../../img/nanswer.png";
import cream from "../../../img/NFT/cream.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/loadmapcss/Quiz.css";

function Quiz() {
  const [testheart, setTestheart] = useRecoilState(Testheart);
  const navigate = useNavigate();
  const { i, d } = useParams();
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

  const themeIdString = i || "";
  const themeNumberString = themeIdString.replace("theme", "");
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");

  // 1. 퀴즈 데이터 로드
  useEffect(() => {
    if (themeNumberString && unitFreeString) {
      axiosInstance
        .get(
          `/roadmap/theme/${parseInt(themeNumberString)}/unit/${parseInt(
            unitFreeString
          )}/quiz`
        )
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

  // ✨ 2. [수정] 데이터 로드가 완료되었을 때 딱 한 번 새로고침 실행
  useEffect(() => {
    if (quizData) {
      const storageKey = `refreshed_${i}_${d}`;
      const hasRefreshed = sessionStorage.getItem(storageKey);

      if (!hasRefreshed) {
        // 새로고침 했다는 표시를 먼저 저장 (무한 루프 방지)
        sessionStorage.setItem(storageKey, "true");
        window.location.reload();
      }
    }
  }, [quizData, i, d]); // quizData가 채워지면 실행됨

  // 레슨 시작 API 호출
  useEffect(() => {
    if (unitFreeString) {
      axiosInstance.post(`/roadmap/lesson/${parseInt(unitFreeString)}/start`);
    }
  }, [unitFreeString]);

  const handleSpacebarPress = (event) => {
    if (
      quizData &&
      currentQuestionIndex < quizData.questions.length &&
      (event.key === " " || event.key === "Spacebar") &&
      isAnswered &&
      !isSubmittingAnswer
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
  }, [quizData, currentQuestionIndex, isAnswered, isSubmittingAnswer]);

  // 퀴즈 시작 시 초기화
  useEffect(() => {
    if (!isInitialized && quizData) {
      setCurrentQuestionIndex(0);
      setScore(0);
      setProgress({
        TF: true,
        score: 0,
        totalQuestions: quizData.questions.length,
      });
      setIsInitialized(true);
    }
  }, [quizData, isInitialized, setProgress]);

  // 현재 문제 진행도 업데이트
  useEffect(() => {
    if (isInitialized && quizData) {
      setProgress((prev) => ({
        ...prev,
        score: currentQuestionIndex,
      }));
    }
  }, [currentQuestionIndex, isInitialized, quizData, setProgress]);

  // 퀴즈 종료 시 progress 초기화
  useEffect(() => {
    const isQuizFinished =
      currentQuestionIndex >= (quizData?.questions.length || 0);
    if (isQuizFinished && quizData) {
      setProgress({
        TF: false,
        score: 0,
        totalQuestions: 0,
      });
    }
  }, [currentQuestionIndex, quizData, setProgress]);

  const handleContinue = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitFreeString}/complete`);
    } catch (e) {}
    navigate(`/roadmap/${i}/unit${parseInt(unitFreeString) + 1}/learn`);
  };

  const handleStop = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitFreeString}/complete`);
    } catch (e) {}
    setProgress({
      TF: false,
      score: 0,
      totalQuestions: 0,
    });
    navigate("/roadmap");
  };

  const handleAnswerClick = (selectedOption, selectedIndex) => {
    if (isAnswered || !quizData || isSubmittingAnswer) return;

    setIsAnswered(true);
    setIsSubmittingAnswer(true);
    setSelectedAnswer(selectedOption);

    const quizId = currentQuestionIndex + 1;
    const user_answer_index = selectedIndex + 1;
    const payload = { answer: user_answer_index.toString() };

    axiosInstance
      .post(`/roadmap/quiz/${quizId}/answer`, payload)
      .then((response) => {
        setServerResponse(response.data);
        if (response.data.isCorrect) setScore((prev) => prev + 1);

        if (response.data.remainingHearts !== undefined) {
          setTestheart(response.data.remainingHearts);
        }
        setIsSubmittingAnswer(false);
      })
      .catch(() => setIsSubmittingAnswer(false));
  };

  if (isLoading)
    return (
      <div className="Qmaincon">
        <p>퀴즈를 불러오는 중...</p>
      </div>
    );
    
  if (!quizData)
    return (
      <div className="Qmaincon">
        <button onClick={handleStop}>돌아가기</button>
      </div>
    );

  if (testheart === 0) {
    return (
      <div className="rqCcon">
        <div className="rqrealcon">
          <img src={cream} className="igotp" alt="크림" />
          <div className="rqcbox">
            <button className="rgo">
              <img src={dia} alt="다이아" />
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

  const isQuizFinished = currentQuestionIndex >= quizData.questions.length;
  if (isQuizFinished) {
    return (
      <div className="learncon">
        <div className="gostop">
          <img src={cream} className="cream" alt="크림" />
          <div className="chose">
            <p className="result-text">
              <span className="score">{score}</span>개 맞추셨어요
            </p>
            <div className="qcbox">
              <button className="rego" onClick={handleContinue}>
                학습 하러가기
              </button>
              <button className="restop" onClick={handleStop}>
                그만하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizData.questions[currentQuestionIndex];

  return (
    <div className="Qmaincon">
      <div className="Tcon">
        <div className="Qcon">
          <p>
            {currentQuestionIndex + 1}. {currentQuiz.stem}
          </p>
          <div className="skip">
            {isAnswered && !isSubmittingAnswer ? (
              <p>{"<Space Bar>를 눌러 다음 문제로 넘어가세요"}</p>
            ) : isSubmittingAnswer ? (
              <p>정답 확인 중...</p>
            ) : (
              <p>답을 선택해 주세요</p>
            )}
          </div>
        </div>
      </div>
      <div className="Acon">
        {!isSubmittingAnswer &&
          currentQuiz.options.map((option, index) => {
            let buttonClass = "AC";
            let imgSrc = null;
            if (isAnswered && serverResponse) {
              const correctIndex = parseInt(serverResponse.correctAnswer) - 1;

              if (option === selectedAnswer) {
                buttonClass += serverResponse.isCorrect ? " TAC" : " FAC";
                imgSrc = serverResponse.isCorrect ? answer : nanswer;
              }

              if (!serverResponse.isCorrect && index === correctIndex) {
                buttonClass += " TAC";
                imgSrc = answer;
              }
            }
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(option, index)}
                disabled={isAnswered}
              >
                {imgSrc && <img src={imgSrc} alt="아이콘" />}
                <p className="QA">{option}</p>
                {imgSrc && <img src={imgSrc} alt="아이콘" />}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Quiz;