// Link import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/MypageProfile/MypageInfoContent.css";

// AxiosInstance import
import axiosInstance from "../../api/axiosInstance";

// Component import
import PasswordStrength, {
  getPasswordStrength,
} from "../PasswordStrength/PasswordStrength";

// Img import
import LogoutImg from "../../../img/MypageProfile/LogoutImg.svg";

// Const
export default function MypageInfoContent() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 이메일 인증 관련 상태
  const [emailVerificationStep, setEmailVerificationStep] = useState(0); // 0: 초기, 1: 코드 전송됨, 2: 인증 완료
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 개인정보 조회
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 카운트다운 타이머
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/me");
      const { username, email } = response.data;

      setUserInfo({
        username: username || "",
        email: email || "",
      });
    } catch (error) {
      console.error("개인정보 조회 실패:", error);
      toast.error("개인정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 변경 모달 열기
  const handleOpenPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setEmailVerificationStep(0);
    setVerificationCode("");
    setCountdown(0);
  };

  // 비밀번호 변경 모달 닫기
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setEmailVerificationStep(0);
    setVerificationCode("");
    setCountdown(0);
  };

  // 로그아웃 모달 열기
  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  // 로그아웃 모달 닫기
  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 비밀번호 강도 계산
  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  // 인증 코드 전송
  const handleSendVerificationCode = async () => {
    if (isSendingCode || countdown > 0) return;

    try {
      setIsSendingCode(true);
      await axiosInstance.post("users/sendEmail", {
        email: userInfo.email,
      });
      setEmailVerificationStep(1);
      setCountdown(30); // 30초 카운트다운
      toast.success("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
      console.error("인증 코드 전송 실패:", error);
      toast.error("인증 코드 전송에 실패했습니다.");
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (isVerifying || !verificationCode) {
      toast.error("인증 코드를 입력해주세요.");
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error("인증 코드는 6자리여야 합니다.");
      return;
    }

    try {
      setIsVerifying(true);
      await axiosInstance.post("/users/verifyEmail", {
        email: userInfo.email,
        verificationCode: verificationCode,
      });
      setEmailVerificationStep(2);
      toast.success("이메일 인증이 완료되었습니다.");
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
      toast.error("인증 코드가 올바르지 않습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  // 비밀번호 변경 제출
  const handleSubmitPasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // 이메일 인증 확인
    if (emailVerificationStep !== 2) {
      toast.error("이메일 인증을 완료해주세요.");
      return;
    }

    // 유효성 검사
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("새 비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 강도 확인
    if (passwordStrength.level < 2) {
      toast.error(
        "비밀번호가 너무 약합니다. 대문자, 숫자, 특수문자를 포함해주세요."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
      return;
    }

    try {
      setIsChangingPassword(true);
      await axiosInstance.post("/users/changePassword", {
        currentPassword,
        newPassword,
      });

      toast.success("비밀번호가 변경되었습니다.");
      handleClosePasswordModal();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      if (error.response?.status === 400) {
        toast.error("현재 비밀번호가 일치하지 않습니다.");
      } else {
        toast.error("비밀번호 변경에 실패했습니다.");
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await axiosInstance.post("/users/logout");
      toast.info("로그아웃되었습니다.");
      navigate("/Login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 에러가 발생해도 로그인 페이지로 이동 (쿠키가 이미 만료된 경우 등)
      navigate("/Login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mypage-main loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="mypage-main">
      <div className="profile-Info-title">개인정보 변경</div>

      <div className="line"></div>

      <div className="profile-Info-content">
        <div className="profile-Info-content-item">
          <div className="profile-Info-setting-title">아이디(ID)</div>
          <div className="profile-Info-setting-text">
            {userInfo.username || "-"}
          </div>
        </div>

        <div className="profile-Info-content-item">
          <div className="profile-Info-setting-title">이메일(Email)</div>
          <div className="profile-Info-setting-text">
            {userInfo.email || "-"}
          </div>
        </div>

        <div className="profile-Info-content-item">
          <div className="profile-Info-setting-title">비밀번호(PW)</div>
          <div
            className="profile-Info-password-button"
            onClick={handleOpenPasswordModal}
          >
            변경하기
          </div>
        </div>

        <div className="profile-Info-content-item">
          <div
            className={`profile-Info-logout-button ${
              isLoggingOut ? "disabled" : ""
            }`}
            onClick={handleOpenLogoutModal}
          >
            로그아웃
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <div className="profile-Info-password-modal-overlay">
          <div
            className="profile-Info-password-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-Info-password-modal-title">
              비밀번호 변경
            </div>

            <div className="profile-Info-password-modal-content">
              {/* 이메일 인증 섹션 */}
              <div className="profile-Info-email-verification-section">
                <label>이메일 인증</label>
                <div className="profile-Info-email-verification-row">
                  <span className="profile-Info-email-text">
                    {userInfo.email}
                  </span>
                  {emailVerificationStep === 2 ? (
                    <span className="profile-Info-verified-badge">
                      ✓ 인증완료
                    </span>
                  ) : (
                    <button
                      className={`profile-Info-send-code-button ${
                        isSendingCode || countdown > 0 ? "disabled" : ""
                      }`}
                      onClick={handleSendVerificationCode}
                      disabled={isSendingCode || countdown > 0}
                    >
                      {isSendingCode
                        ? "전송 중..."
                        : countdown > 0
                        ? `재전송 (${Math.floor(countdown / 60)}:${String(
                            countdown % 60
                          ).padStart(2, "0")})`
                        : "인증코드 전송"}
                    </button>
                  )}
                </div>
                {emailVerificationStep === 1 && (
                  <div className="profile-Info-verification-code-row">
                    <input
                      type="text"
                      placeholder="인증 코드 6자리 입력"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                    />
                    <button
                      className={`profile-Info-verify-button ${
                        isVerifying ? "disabled" : ""
                      }`}
                      onClick={handleVerifyCode}
                      disabled={isVerifying}
                    >
                      {isVerifying ? "확인 중..." : "확인"}
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-Info-password-input-group">
                <label>현재 비밀번호</label>
                <input
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                />
              </div>

              <div className="profile-Info-password-input-group">
                <label>새 비밀번호</label>
                <input
                  type="password"
                  placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                />
                <PasswordStrength password={passwordData.newPassword} />
              </div>

              <div className="profile-Info-password-input-group">
                <label>새 비밀번호 확인</label>
                <input
                  type="password"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="profile-Info-password-modal-buttons">
              <button
                className="profile-Info-password-modal-cancel"
                onClick={handleClosePasswordModal}
              >
                취소
              </button>
              <button
                className={`profile-Info-password-modal-submit ${
                  isChangingPassword ||
                  emailVerificationStep !== 2 ||
                  passwordStrength.level < 2
                    ? "disabled"
                    : ""
                }`}
                onClick={
                  !isChangingPassword &&
                  emailVerificationStep === 2 &&
                  passwordStrength.level >= 2
                    ? handleSubmitPasswordChange
                    : undefined
                }
                disabled={
                  isChangingPassword ||
                  emailVerificationStep !== 2 ||
                  passwordStrength.level < 2
                }
              >
                {isChangingPassword ? "변경 중..." : "변경하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <div className="profile-Info-password-modal-overlay">
          <div
            className="profile-Info-password-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-Info-logout-modal-title">
              정말 학습을 종료하시겠습니까?
            </div>

            <div>
              <img
                className="profile-Info-logout-img"
                src={LogoutImg}
                alt="LogoutImg"
              />
            </div>

            <div className="profile-Info-logout-modal-buttons">
              <button
                className="profile-Info-logout-modal-cancel"
                onClick={handleCloseLogoutModal}
              >
                계속하기
              </button>
              <button
                className={`profile-Info-logout-modal-submit ${
                  isLoggingOut ? "disabled" : ""
                }`}
                onClick={!isLoggingOut ? handleLogout : undefined}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
