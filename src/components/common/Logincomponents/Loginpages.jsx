import { useState } from "react";
import "../../css/Loginpagescss/Loginpages.css";
import Signuppages from "./Signuppages";
// setLogin prop을 받도록 수정
function Loginpages({ setLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

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
    if (!id || !password) {
      showToast("아이디와 비밀번호를 모두 입력해주세요.", "error");
      return;
    }
    showToast("로그인 성공!", "success");
  };

  const handleClose = () => {
    setLogin(false);
  };

  const [signup, setSignup] = useState(false);

  return signup === false ? (
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
        <h1 className="login-title">로그인</h1>
        <p className="login-subtitle">계정에 로그인 하세요</p>
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
          <div className="forgot-password">
            <button type="button" className="lost">
              비밀번호를 잊으셨나요?
            </button>
          </div>
          <button type="submit" className="login">
            로그인
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
            계정이 없으신가요?{" "}
            <button className="signup" onClick={() => setSignup(true)}>
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Signuppages setSignup={setSignup} setLogin={setLogin} />
  );
}

export default Loginpages;
