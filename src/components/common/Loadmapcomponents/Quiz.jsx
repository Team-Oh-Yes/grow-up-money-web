import { useState } from "react";

const sample = [
  {
    question:
      "다음 중 프론트엔드 개발에 주로 사용되는 언어가 아닌 것은 무엇인가요?",
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
      "CSS에서 요소를 중앙에 배치하는 데 흔히 사용되는 속성 조합이 아닌 것은 무엇인가요?",
    options: [
      "display: flex; justify-content: center; align-items: center;",
      "margin: auto; display: block;",
      "position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);",
      "float: left; margin-right: 20px;",
    ],
    correctAnswer: "float: left; margin-right: 20px;",
  },
  {
    question:
      "리액트(React)에서 컴포넌트의 상태(state)를 관리하기 위해 사용하는 훅(Hook)은 무엇인가요?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
  },
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuiz = sample[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= sample.length;

  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    const isCorrectAnswer = option === currentQuiz.correctAnswer;

    if (isCorrectAnswer) {
      setIsAnswered(true);
      setScore((prevScore) => prevScore + 1);

      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  const quizContainerClass = `Qcon ${
    isAnswered ? "TQcon" : selectedOption !== null ? "FQcon" : ""
  }`;

  const getButtonClass = (option) => {
    if (selectedOption === option) {
      const isCorrectAnswer = option === currentQuiz.correctAnswer;
      return isCorrectAnswer ? "AC TAC" : "AC FAC";
    }
    return "AC";
  };

  if (isQuizFinished) {
    return (
      <div className="Qmaincon">
        <h2>🎉 퀴즈 종료!</h2>
        <p>
          총 {sample.length} 문제 중 **{score}** 문제를 맞히셨습니다.
        </p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
          }}
        >
          다시 시작
        </button>
      </div>
    );
  }

  return (
    <div className="Qmaincon">
      <p className="Qnumber">
        문제 {currentQuestionIndex + 1} / {sample.length}
      </p>

      <div className={quizContainerClass}>
        <p>{currentQuiz.question}</p>
      </div>

      <div className="Acon">
        {currentQuiz.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
          >
            <p className="QA">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;