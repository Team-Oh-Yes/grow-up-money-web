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

  const themeIdString = i || "";
  const themeNumberString = themeIdString.replace("theme", "");
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");

  // 로드맵 데이터 가져오기
  useEffect(() => {
    if (themeNumberString && unitFreeString) {
      axiosInstance
        .get(
          `/roadmap/theme/${parseInt(themeNumberString)}/unit/${parseInt(
            unitFreeString
          )}/quiz`
        )
        .then((response) => {
          console.log("퀴즈 로드맵:", response.data);
          setQuizData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("퀴즈 데이터 로드 실패:", error);
          setIsLoading(false);
        });
    }
  }, [themeNumberString, unitFreeString]);

  // 퀴즈 시작 API 호출
  useEffect(() => {
    if (unitFreeString) {
      axiosInstance
        .post(`/roadmap/lesson/${parseInt(unitFreeString)}/start`)
        .then((response) => {
          console.log("퀴즈 시작 API 호출 성공:");
        })
        .catch((error) => {
          console.error("퀴즈 시작 API 호출 실패:");
        });
    }
  }, [unitFreeString]);

  const handleSpacebarPress = (event) => {
    if (
      quizData &&
      currentQuestionIndex < quizData.questions.length &&
      (event.key === " " || event.key === "Spacebar")
    ) {
      event.preventDefault();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => {
      window.removeEventListener("keydown", handleSpacebarPress);
    };
  }, [quizData, currentQuestionIndex, isAnswered]);

  useEffect(() => {
    if (!isInitialized && quizData) {
      // 새로운 퀴즈 시작 시 상태 초기화
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
  }, [quizData]);

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
    if (quizData) {
      setProgress((prev) => ({
        ...prev,
        totalQuestions: quizData.questions.length,
      }));
    }
  }, [quizData, setProgress]);

  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      score: currentQuestionIndex,
    }));
  }, [currentQuestionIndex, setProgress]);

  useEffect(() => {
    if (quizData && currentQuestionIndex >= quizData.questions.length) {
      setProgress((prev) => ({
        ...prev,
        TF: true,
      }));
    }
  }, [currentQuestionIndex, quizData, setProgress]);

  const handleAnswerClick = (selectedOption, index) => {
    if (isAnswered || !quizData) return;

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    const currentQuiz = quizData.questions[currentQuestionIndex];
    const quizId = currentQuestionIndex + 1;
    const payload = {
      answer: selectedOption,
    };

    axiosInstance
      .post(`/roadmap/quiz/${quizId}/answer`, payload)
      .then((response) => {
        console.log("퀴즈 정답 호출 성공:", response.data);
      })
      .catch((error) => {
        console.error(
          "퀴즈 정답 API 호출 실패:",
          error.response ? error.response.data : error.message
        );
      });

    // =========================================================================
    // 퀴즈 채점 및 UI 로직 (유지)
    // =========================================================================

    // 정답은 항상 첫 번째 옵션 (options[0])
    const isCorrectAnswer = selectedOption === currentQuiz.options[0];

    if (isCorrectAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setTestheart((prevHeart) => {
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

  // 로딩 중
  if (isLoading) {
    return (
      <div className="Qmaincon">
        <div className="Tcon">
          <div className="Qcon">
            <p>퀴즈를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 데이터 로드 실패
  if (!quizData) {
    return (
      <div className="Qmaincon">
        <div className="Tcon">
          <div className="Qcon">
            <p>퀴즈 데이터를 불러올 수 없습니다.</p>
            <button onClick={handleStop}>돌아가기</button>
          </div>
        </div>
      </div>
    );
  }

  // 1. 하트가 0일 경우
  if (testheart === 0) {
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

  // 2. 퀴즈가 완료되었을 경우
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

  // 3. 퀴즈 진행 중
  const currentQuiz = quizData.questions[currentQuestionIndex];

  return (
    <div className="Qmaincon">
      <div className="Tcon">
        <div className="Qcon">
          <p>
            {currentQuestionIndex + 1}. {currentQuiz.stem}
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
              if (option === currentQuiz.options[0]) {
                buttonClass += " TAC";
                imgSrc = answer;
              } else {
                buttonClass += " FAC";
                imgSrc = nanswer;
              }
            } else if (option === currentQuiz.options[0]) {
              buttonClass += " TAC_show_correct";
            }
          }
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerClick(option, index)}
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
