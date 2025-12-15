import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
// Testheart import 추가
import { quizProgressState, Testheart } from "../../../atoms";
import answer from "../../../img/answer.png";
import nanswer from "../../../img/nanswer.png";
import cream from "../../../img/NFT/cream.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/loadmapcss/Quiz.css";

const sample = [
  {
    question: "다음 중 프론트엔드 개발에 주로 사용되는 언어가 아닌 것은?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: "Python",
  },
  {
    question: "DOM은 무엇의 약자이며 어떤 역할을 하나요?",
    options: [
      "Document Object Model - 웹 페이지의 구조화된 표현",
      "Data Operation Manager - 데이터베이스 관리 도구",
      "Digital Output Module - 하드웨어 제어 장치",
      "Domain Object Model - 비즈니스 로직 모델",
    ],
    correctAnswer: "Document Object Model - 웹 페이지의 구조화된 표현",
  },
  {
    question:
      "CSS에서 요소를 중앙에 배치하는 데 흔히 사용되는 속성 조합이 아닌 것은?",
    options: [
      "display: flex; justify-content: center; align-items: center;",
      "margin: auto; display: block;",
      "position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);",
      "float: left; margin-right: 20px;",
    ],
    correctAnswer: "float: left; margin-right: 20px;",
  },
  {
    question: "리액트에서 상태(state)를 관리하기 위해 사용하는 훅(Hook)은?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
  },
];

function Quiz() {
  // Testheart Recoil 상태 사용
  const [testheart, setTestheart] = useRecoilState(Testheart);
  const navigate = useNavigate();
  const { i, d } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useRecoilState(quizProgressState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [na, setNa] = useState(false);
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");
  const currentQuiz = sample[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= sample.length;

  const handleSpacebarPress = (event) => {
    if (!isQuizFinished && (event.key === " " || event.key === "Spacebar")) {
      event.preventDefault();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  console.log(unitFreeString);

  useEffect(() => {
    if (unitFreeString) {
      axiosInstance
        .post(`/roadmap/lesson/${parseInt(unitFreeString - 1)}/start`)
        .then((response) => {
          console.log("퀴즈 시작 API 호출 성공:", response.data);
        })
        .catch((error) => {
          console.error("퀴즈 시작 API 호출 실패:", error);
        });
    } else {
      console.warn("라우트 파라미터 'd'가 유효하지 않습니다.");
    }
  }, [unitFreeString]);

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => {
      window.removeEventListener("keydown", handleSpacebarPress);
    };
  }, [isQuizFinished, isAnswered]);

  useEffect(() => {
    if (!isInitialized) {
      if (progress.TF) {
        setCurrentQuestionIndex(sample.length);
        setScore(progress.score || 0);
      }
      setIsInitialized(true);
    }
  }, []);

  const handleContinue = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitFreeString}/complete`);
      console.log("퀴즈 완료 API 호출 성공 (Continue)");
    } catch (error) {
      console.error("퀴즈 완료 API 호출 실패 (Continue):", error);
    }
    navigate(`/roadmap/${i}/unit${parseInt(unitFreeString) + 1}/learn`);
  };

  const handleStop = async () => {
    try {
      await axiosInstance.post(`/roadmap/lesson/${unitFreeString}/complete`);
      console.log("퀴즈 완료 API 호출 성공 (Stop)");
    } catch (error) {
      console.error("퀴즈 완료 API 호출 실패 (Stop):", error);
    }
    navigate("/roadmap");
  };

  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      totalQuestions: sample.length,
    }));
  }, [setProgress]);

  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      score: currentQuestionIndex,
    }));
  }, [currentQuestionIndex, setProgress]);

  useEffect(() => {
    if (isQuizFinished) {
      setProgress((prev) => ({
        ...prev,
        TF: true,
      }));
    }
  }, [isQuizFinished, setProgress]);

  const handleAnswerClick = (selectedOption) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    const isCorrectAnswer = selectedOption === currentQuiz.correctAnswer;

    if (isCorrectAnswer) {
      setScore((prev) => prev + 1);
    } else {
      // 오답일 경우 하트 감소 로직 (Testheart 업데이트)
      setTestheart((prevHeart) => {
        // 하트가 0보다 클 경우에만 1 감소
        if (prevHeart > 0) {
          return prevHeart - 1;
        }
        return 0;
      });
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    }, 1000);
  };

  // 1. 🚨 하트가 0일 경우, 무조건 이 창만 뜹니다. (최우선)
  if (testheart == 0) {
    return (
      <div className="rqCcon">
        <div className="rqrealcon">
          <img src={cream} className="igotp"></img>
          <div className="rqcbox">
            <button className="rgo">하트구매하기</button>
            <button className="rstop" onClick={handleStop}>
              학습 그만하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 퀴즈가 완료되었을 경우 (하트가 0이 아니면서 퀴즈가 끝났을 때)
  if (isQuizFinished) {
    return (
      <div className="learncon">
        <div className="gostop">
          <img src={cream} className="cream"></img>
          <div className="chose">
            <p className="result-text">
              <span className="score">{score}</span>개 맞추셨어요
            </p>
            <div className="qcbox">
              <button className="go" onClick={handleContinue}>
                학습 하러가기
              </button>
              <button className="stop" onClick={handleStop}>
                그만하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. 퀴즈 진행 중 (기본 화면)
  return (
    <div className="Qmaincon">
      <div className="Tcon">
        <div className="Qcon">
          <p>
            {currentQuestionIndex + 1}. {currentQuiz.question}
          </p>
          <div className="skip">
            <p>{"<Space Bar>로 다음 문제로 넘어가기"}</p>
          </div>
        </div>
      </div>
      <div className="Acon">
        {currentQuiz.options.map((option, index) => {
          let buttonClass = "AC";
          let imgSrc = null;

          if (isAnswered) {
            if (option === selectedAnswer) {
              if (option === currentQuiz.correctAnswer) {
                buttonClass += " TAC";
                imgSrc = answer;
              } else {
                buttonClass += " FAC";
                imgSrc = nanswer;
              }
            } else if (option === currentQuiz.correctAnswer) {
              buttonClass += " TAC_show_correct";
            }
          }
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
            >
              {imgSrc && <img src={imgSrc} alt="정답/오답 아이콘" />}
              <p className="QA">{option}</p>
              {imgSrc && <img src={imgSrc} alt="정답/오답 아이콘" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;
