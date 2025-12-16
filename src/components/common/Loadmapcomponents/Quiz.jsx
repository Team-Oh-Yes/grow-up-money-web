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
  const [selectedAnswer, setSelectedAnswer] = useState(null); // UI 표시용: 선택된 옵션의 문자열
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useRecoilState(quizProgressState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverResponse, setServerResponse] = useState(null);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false); // 💡 정답 제출 로딩 상태 추가

  const themeIdString = i || "";
  const themeNumberString = themeIdString.replace("theme", "");
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");

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
      (event.key === " " || event.key === "Spacebar") &&
      isAnswered &&
      !isSubmittingAnswer // 로딩 중이 아닐 때만 넘어감
    ) {
      event.preventDefault();
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false); // 다음 문제로 넘어갈 때 상태 초기화
      setSelectedAnswer(null);
      setServerResponse(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => {
      window.removeEventListener("keydown", handleSpacebarPress);
    };
  }, [quizData, currentQuestionIndex, isAnswered, isSubmittingAnswer]);

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
    if (quizData && currentQuestionIndex >= quizData.questions.length) {
      setProgress((prev) => ({
        ...prev,
        TF: true,
        score: score, // 퀴즈 완료 시 최종 점수 반영
      }));
    }
  }, [currentQuestionIndex, quizData, setProgress, score]);

  // selectedOption: 옵션 문자열, selectedIndex: 0-based 인덱스
  const handleAnswerClick = (selectedOption, selectedIndex) => {
    if (isAnswered || !quizData || isSubmittingAnswer) return;

    setIsAnswered(true);
    setIsSubmittingAnswer(true); // 💡 API 호출 시작: 로딩 상태 활성화
    setSelectedAnswer(selectedOption); // UI 표시용으로 옵션 문자열 저장

    const currentQuiz = quizData.questions[currentQuestionIndex];

    // API 명세에 따라 적절한 ID를 사용하세요.
    const quizId = currentQuestionIndex + 1;

    // 서버에 1-based 인덱스(문자열) 전송
    const user_answer_index = selectedIndex + 1;
    const payload = {
      answer: user_answer_index.toString(),
    };

    axiosInstance
      .post(`/roadmap/quiz/${quizId}/answer`, payload)
      .then((response) => {
        console.log("퀴즈 정답 호출 성공:", response.data);

        setServerResponse(response.data);

        if (response.data.isCorrect) {
          setScore((prev) => prev + 1);
        }

        if (response.data.remainingHearts !== undefined) {
          setTestheart(response.data.remainingHearts);
        }

        setIsSubmittingAnswer(false); // 💡 API 호출 완료 (성공)
      })
      .catch((error) => {
        console.error(
          "퀴즈 정답 API 호출 실패:",
          error.response ? error.response.data : error.message
        );

        // 에러가 발생해도 서버 응답이 없는 상태로 넘어갈 수 있도록 처리
        setIsSubmittingAnswer(false); // 💡 API 호출 완료 (실패)
      });
  };

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
            {isAnswered && !isSubmittingAnswer ? ( // 정답 확인 완료 후
              <p>{"<Space Bar>를 눌러 다음 문제로 넘어가세요"}</p>
            ) : isSubmittingAnswer ? ( // 정답 확인 중
              <p>정답을 확인하는 중입니다...</p>
            ) : (
              // 답 선택 대기 중
              <p>답을 선택해 주세요</p>
            )}
          </div>
        </div>
      </div>
      <div className="Acon">
        {isSubmittingAnswer ? (
          <div className="quiz-loading-message">
            <p>정답 확인 중...</p>
            {/* 여기에 로딩 스피너 같은 시각적 요소를 추가할 수 있습니다. */}
          </div>
        ) : (
          currentQuiz.options.map((option, index) => {
            let buttonClass = "AC";
            let imgSrc = null;

            if (isAnswered && serverResponse) {
              // 서버의 correctAnswer는 1-based 인덱스 (문자열 "1", "2", "3", "4")
              const correctIndex = parseInt(serverResponse.correctAnswer) - 1; // 0-based 인덱스

              // 1. 사용자가 선택한 답에 대한 표시
              if (option === selectedAnswer) {
                if (serverResponse.isCorrect) {
                  buttonClass += " TAC";
                  imgSrc = answer;
                } else {
                  buttonClass += " FAC";
                  imgSrc = nanswer;
                }
              }

              // 2. 오답일 때 정답 보여주기 (사용자가 선택한 답이 아닌, 실제 정답일 경우)
              if (!serverResponse.isCorrect && index === correctIndex) {
                if (option !== selectedAnswer) {
                  buttonClass += " TAC_show_correct";
                }
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                // 옵션 문자열과 0-based 인덱스를 모두 전달
                onClick={() => handleAnswerClick(option, index)}
                disabled={isAnswered}
              >
                {imgSrc && <img src={imgSrc} alt="정답/오답 아이콘" />}
                <p className="QA">{option}</p>
                {imgSrc && <img src={imgSrc} alt="정답/오답 아이콘" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Quiz;
