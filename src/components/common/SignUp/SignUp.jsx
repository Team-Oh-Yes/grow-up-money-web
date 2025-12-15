// Link import
import '../../css/LoginAndSignUp/SignUp.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../api/axiosInstance';;
import GoogleIcon from '../../../img/Google-icon.png';

// Const
export default function SignUp() {
    const navigate = useNavigate();

    const [sendData, setSendData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const Earth = ({ img, alt, href }) => {
        return (
            <a href={href} className="social-login-btn">
                <img src={img} alt={alt} className="social-login-icon" />
            </a>
        );
    };

    const toastcode = (time = 1000) => ({
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
    });

    const onChangeId = (e) => {
        setSendData({
            ...sendData,
            username: e.target.value,
        });
    };

    const onChangePassword = (e) => {
        setSendData({
            ...sendData,
            password: e.target.value,
        });
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onChangeEmail = (e) => {
        setSendData({
            ...sendData,
            email: e.target.value,
        });
    };

    // 이메일 유효성 검사 함수
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 유효성 검사
        if (!sendData.username) {
            toast.info('닉네임을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!sendData.password) {
            toast.info('비밀번호를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (sendData.password.length < 8) {
            toast.info('비밀번호는 8자 이상이어야 합니다', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (sendData.password !== confirmPassword) {
            toast.info('비밀번호가 일치하지 않습니다', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!sendData.email) {
            toast.info('이메일을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!isValidEmail(sendData.email)) {
            toast.info('올바른 이메일 형식을 입력해주세요(@, 도메인 포함)', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }

        // API 요청
        axiosInstance.post('/users/signup', sendData)
            // 성공 시
            .then(response => {
                // 로그인 페이지로 이동하면서 state 전달
                navigate('/login', { state: { signUpSuccess: true } });
            })

            // 실패 시
            .catch(error => {
                console.error('API Error:', error);

                if (error.message) {
                    // 요청 설정 중에 에러가 발생한 경우
                    toast.error(error.message, toastcode(3000));
                    toast.clearWaitingQueue();
                }
            });
    };

    return (
        <>
            <div className="signup-overlay">
                <div className="signup-container">
                    {/* 모달 헤더 */}
                    <div className="signup-header">
                        <h1 className="signup-title">Oh!Yes</h1>
                    </div>

                    {/* 소셜 회원가입 섹션 */}
                    <div className="social-signup-section">
                        <p className="social-signup-title">소셜 회원가입</p>

                        <div className="social-signup-buttons">
                            {/* 구글 회원가입 버튼 */}
                            <Earth img={GoogleIcon} alt="login with Google" href={"https://growmoney.duckdns.org/oauth2/authorization/google"} />
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="signup-divider"></div>

                    {/* 모달 본문 */}
                    <div className="signup-body">
                        {/* 회원가입 폼 */}
                        <form className="signup-form">
                            <input type="text" className="signup-input" placeholder="아이디" value={sendData.username} onChange={onChangeId} />
                            <input type="password" className="signup-input" placeholder="비밀번호" value={sendData.password} onChange={onChangePassword} />
                            <input type="password" className="signup-input" placeholder="비밀번호 확인" value={confirmPassword} onChange={onChangeConfirmPassword} />
                            <input type="email" className="signup-input" placeholder="이메일" value={sendData.email} onChange={onChangeEmail} />

                            {/* 회원가입 버튼 */}
                            <button className="signup-button" type="submit" onClick={handleSignUp}>회원가입</button>
                            <p className="signup-login-link">이미 계정이 있으신가요? <a className="signup-link" href="/login">로그인</a></p>
                        </form>

                        {/* 구분선 */}
                        <div className="signup-divider"></div>

                        {/* 약관 텍스트 */}
                        <div className="signup-terms">
                            <p>The Google <a className="signup-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a className="signup-link" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};