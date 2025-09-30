import { useState } from "react";
import "../../css/Loginpagescss/Signuppages.css";

// setSignup, setLogin prop을 받도록 수정
function Signuppages({ setSignup, setLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [checkpw, setCheckpw] = useState("");

  // 토스트 메시지를 보여주는 함수 (타입 추가)
  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id || !password || !checkpw) {
      showToast("모든 필드를 입력해주세요.", "error");
      return;
    }
    if (password !== checkpw) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }
    showToast("회원가입 성공!", "success");
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
          />
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 다시 입력해주세요"
            value={checkpw}
            onChange={(e) => setCheckpw(e.target.value)}
          />
          <button type="submit" className="login">
            가입하기
          </button>
          <button type="button" className="google-login-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google login"
            />
          </button>
        </form>

        <div className="signup-link">
          <p>
            계정을 만들었나요?{" "}
            <button className="signup" onClick={() => setSignup(false)}>
              로그인하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signuppages;
