import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import answer from "../../../img/answer.png";
import nanswer from "../../../img/nanswer.png";
import cream from "../../../img/NFT/cream.svg";
import "../../css/loadmapcss/Quiz.css";

// 체험용 퀴즈 데이터
const PRE_QUIZ_DATA = {
  questions: [
    {
      stem: "준하가 가게에서 산 사탕처럼 형태가 있고 만질 수 있는 것을 무엇이라고 할까요?",
      options: ["재화", "서비스", "자유재", "경제재"],
      correctAnswer: "1",
      explanation:
        "형태가 있고 만질 수 있는 물건을 '재화'라고 해요. 사탕, 연필, 책 등이 재화에 해당해요!",
    },
    {
      stem: "미용실에서 머리를 자르는 것처럼 형태는 없지만 우리에게 가치를 주는 것은?",
      options: ["재화", "서비스", "자유재", "생산"],
      correctAnswer: "2",
      explanation:
        "형태는 없지만 우리에게 도움을 주는 활동을 '서비스'라고 해요. 머리 자르기, 병원 진료, 배달 등이 서비스예요!",
    },
    {
      stem: "공기나 바람처럼 누구나 마음껏 이용할 수 있는 것을 무엇이라고 할까요?",
      options: ["경제재", "재화", "자유재", "서비스"],
      correctAnswer: "3",
      explanation:
        "공기, 바람, 햇빛처럼 돈을 내지 않아도 누구나 자유롭게 이용할 수 있는 것을 '자유재'라고 해요!",
    },
    {
      stem: "떡볶이처럼 돈을 지불해야 얻을 수 있는 것을 무엇이라고 할까요?",
      options: ["자유재", "경제재", "서비스", "생산재"],
      correctAnswer: "2",
      explanation:
        "떡볶이, 장난감, 옷처럼 돈을 내고 사야 하는 것들을 '경제재'라고 해요. 양이 한정되어 있어서 가치가 있답니다!",
    },
    {
      stem: "다음 중 '재화'에 해당하는 것을 모두 고르세요.",
      options: [
        "연필, 공책, 지우개",
        "택시 타기, 영화 보기",
        "바람, 공기, 햇빛",
        "병원 진료, 배달",
      ],
      correctAnswer: "1",
      explanation:
        "연필, 공책, 지우개는 모두 형태가 있는 물건이므로 '재화'예요. 택시 타기나 영화 보기는 '서비스'랍니다!",
    },
    {
      stem: "다음 중 '서비스'에 해당하는 것은 무엇일까요?",
      options: ["아이스크림", "선생님께서 수업하시기", "게임기", "사탕"],
      correctAnswer: "2",
      explanation:
        "선생님의 수업은 형태는 없지만 우리에게 지식이라는 가치를 주는 '서비스'예요!",
    },
    {
      stem: "자유재와 경제재의 가장 큰 차이점은 무엇일까요?",
      options: [
        "크기가 다르다",
        "돈을 내야 하는지 여부",
        "맛이 다르다",
        "색깔이 다르다",
      ],
      correctAnswer: "2",
      explanation:
        "자유재는 공짜로 누구나 쓸 수 있지만, 경제재는 돈을 내고 사야 해요. 이것이 가장 큰 차이점이에요!",
    },
  ],
};

function PreviewQuiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const quizData = PRE_QUIZ_DATA;

  const handleSpacebarPress = (event) => {
    if (
      currentQuestionIndex < quizData.questions.length &&
      (event.key === " " || event.key === "Spacebar") &&
      isAnswered
    ) {
      event.preventDefault();
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setCorrectAnswerIndex(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => window.removeEventListener("keydown", handleSpacebarPress);
  }, [currentQuestionIndex, isAnswered]);

  const handleStop = () => {
    navigate("/");
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setCorrectAnswerIndex(null);
  };

  const handleAnswerClick = (selectedOption, selectedIndex) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    const currentQuiz = quizData.questions[currentQuestionIndex];
    const correctIdx = parseInt(currentQuiz.correctAnswer) - 1;
    const userCorrect = selectedIndex === correctIdx;

    setCorrectAnswerIndex(correctIdx);
    setIsCorrect(userCorrect);

    if (userCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const isQuizFinished = currentQuestionIndex >= quizData.questions.length;

  if (isQuizFinished) {
    return (
      <div className="learncon">
        <div className="gostop">
          <img
            src={cream}
            className="cream"
            alt="크림"
            style={{ width: "550px", height: "550px", objectFit: "contain" }}
          />
          <div className="chose">
            <p className="result-text">
              체험 퀴즈 완료! <span className="score">{score}</span>개
              맞추셨어요
            </p>
            <div className="qcbox">
              <button className="rego" onClick={handleRetry}>
                다시 풀기
              </button>
              <button className="restop" onClick={handleStop}>
                종료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizData.questions[currentQuestionIndex];

  let qconClass = "Qcon";
  if (isAnswered) {
    qconClass += isCorrect ? " TQ" : " FQ";
  }

  return (
    <div className="Qmaincon">
      <div className="Tcon">
        <div className={qconClass}>
          <p>
            Q{currentQuestionIndex + 1}. {currentQuiz.stem}
          </p>
          <div className="skip">
            {isAnswered ? (
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

          if (isAnswered) {
            if (option === selectedAnswer) {
              buttonClass += isCorrect ? " TAC" : " FAC";
              imgSrc = isCorrect ? answer : nanswer;
            }
            if (!isCorrect && index === correctAnswerIndex) {
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

export default PreviewQuiz;
