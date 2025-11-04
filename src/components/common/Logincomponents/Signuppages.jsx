import { useState } from "react";
import Sign from "../../api/signup"; // axios 인스턴스
import "../../css/Loginpagescss/Signuppages.css";

function Signuppages({ setSignup, setLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkpw, setCheckpw] = useState("");
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 토스트 메시지 표시 함수
  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };
  
  // ✅ 회원가입 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- 기본 유효성 검사 ---
    if (!id || !password || !checkpw || !email) {
      showToast("모든 필드를 입력해주세요.", "error");
      return;
    }

    if (password !== checkpw) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

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

      // ✅ 실제 회원가입 요청
      const response = await Sign.post("/users/signup", signupData);

      showToast("회원가입 성공!", "success");

      // ✅ 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        setSignup(false);
      }, 2000);
    } catch (error) {
      // --- 서버 응답 있는 경우 ---
      if (error.response) {
        const { status, data } = error.response;

        // ✅ 400: 유효성 검사 실패
        if (status === 400 && data.errors) {
          const firstErrorMessage = Object.values(data.errors)[0];
          showToast(
            firstErrorMessage || "입력값이 올바르지 않습니다.",
            "error"
          );
        }
        // ✅ 409: 이미 존재하는 아이디
        else if (status === 409) {
          showToast(data.detail || "이미 사용 중인 아이디입니다.", "error");
        }
        // ✅ 기타 서버 오류
        else {
          showToast(data.detail || "회원가입에 실패했습니다.", "error");
        }
      }
      // --- 요청 보냈는데 응답이 없음 ---
      else if (error.request) {
        showToast("서버와 연결할 수 없습니다.", "error");
      }
      // --- 코드 내부 오류 ---
      else {
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
      {/* ✅ 토스트 메시지 */}
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
