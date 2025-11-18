import { useState } from "react";
import Sign from "../../api/login";
import "../../css/Loginpagescss/Signuppages.css";
import axios from "axios";

function Signuppages({ setSignup, setLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkpw, setCheckpw] = useState("");
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 토스트 메시지를 보여주는 함수
  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성 검사
    if (!id || !password || !checkpw || !email) {
      showToast("모든 필드를 입력해주세요.", "error");
      return;
    }
    if (password !== checkpw) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    // 이메일 형식 검사 (선택사항)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("올바른 이메일 형식을 입력해주세요.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        username: id,
        password: password,
        email: email,
      };
      const response = await Sign.post("/users/signup", signupData);
      showToast("회원가입 성공!", "success");
      setTimeout(() => {
        setSignup(false);
      }, 2000);
    } catch (error) {
      // 에러 처리
      if (error.response) {
        // 서버가 응답을 반환한 경우
        const errorMessage =
          error.response.data.message || "회원가입에 실패했습니다.";
        showToast(errorMessage, "error");
      } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못한 경우
        showToast("서버와 연결할 수 없습니다.", "error");
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
      }
      console.error("회원가입 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setLogin(false);
  };

  return (
    <div className="Loginback" onClick={handleClose}>
      {toastMessage && (
        <div
          className={`toast-message ${
            toastType === "success" ? "toast-success" : "toast-error"
          }`}
        >
          {toastMessage}
        </div>
      )}

      <div className="login-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="login-title">회원가입</h1>
        <p className="login-subtitle">회원가입을 하세요</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="email"
            className="input-field"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 다시 입력해주세요"
            value={checkpw}
            onChange={(e) => setCheckpw(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="login" disabled={isLoading}>
            {isLoading ? "가입 중..." : "가입하기"}
          </button>
          <button
            type="button"
            className="google-login-btn"
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google login"
            />
          </button>
        </form>

        <div className="signup-link">
          <p>
            계정을 만들었나요?{" "}
            <button
              className="signup"
              onClick={() => setSignup(false)}
              disabled={isLoading}
            >
              로그인하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signuppages;