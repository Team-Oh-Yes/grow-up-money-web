import { useState } from "react";
import "../../css/loadmapcss/Quiz.css"; // CSS 경로는 유지

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
  const [isCorrect, setIsCorrect] = useState(null); // null: 초기 상태, true: 정답, false: 오답
  const [score, setScore] = useState(0); // 점수 상태 추가

  // 현재 퀴즈 데이터
  const currentQuiz = sample[currentQuestionIndex];

  // 모든 퀴즈를 완료했는지 확인
  const isQuizFinished = currentQuestionIndex >= sample.length;

  // 답변 처리 함수
  const handleAnswerClick = (selectedOption) => {
    // 이미 답을 선택한 후라면 함수 실행 중단 (2초 타이머 동안 중복 클릭 방지)
    if (isCorrect !== null) return;

    const isCorrectAnswer = selectedOption === currentQuiz.correctAnswer;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      setScore((prevScore) => prevScore + 1); // 정답일 경우 점수 증가
    }

    // 2초 후 다음 문제로 이동
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsCorrect(null); // 상태 초기화
    }, 2000);
  };

  // 문제 컨테이너 클래스 결정
  const quizContainerClass = `Qcon ${
    isCorrect === true ? "TQcon" : isCorrect === false ? "FQcon" : ""
  }`;

  // 버튼 클래스 결정 (현재는 모든 버튼에 동일하게 적용되도록 수정)
  const buttonClass = `AC ${
    isCorrect === true ? "TAC" : isCorrect === false ? "FAC" : ""
  }`;

  // 퀴즈 완료 화면 렌더링
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
      {/* 문제 번호 표시 */}
      <p className="Qnumber">
        문제 {currentQuestionIndex + 1} / {sample.length}
      </p>

      {/* 문제 컨테이너 */}
      <div className={quizContainerClass}>
        <p>{currentQuiz.question}</p>
      </div>

      {/* 답변 컨테이너 */}
      <div className="Acon">
        {currentQuiz.options.map((option, index) => (
          <button
            key={index}
            className={buttonClass}
            onClick={() => handleAnswerClick(option)}
            disabled={isCorrect !== null} // 답변을 선택한 후에는 비활성화
          >
            <p className="QA">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
