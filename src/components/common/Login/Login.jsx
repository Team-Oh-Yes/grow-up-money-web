// Link import
import '../../css/LoginAndSignUp/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Img import
import GoogleIcon from '../../../img/Google-icon.png';

// Const
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [sendData, setSendData] = useState({
        username: "",
        password: "",
    });

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

    // 회원가입 성공 시 토스트 메시지 표시
    useEffect(() => {
        if (location.state?.signUpSuccess) {
            toast.success('회원가입 성공!', {...toastcode(2000)});
            toast.clearWaitingQueue();
            
            // state 초기화 (뒤로가기 후 다시 접속 시 메시지 재표시 방지)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

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

    const handleLogin = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 유효성 검사
        if (!sendData.username) {
            toast.info('아이디를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!sendData.password) {
            toast.info('비밀번호를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }

        // API 요청
        axiosInstance.post('/users/login', sendData)
            .then(response => {
                console.log('로그인 성공:', response.data);

                // 메인 페이지로 이동하면서 state 전달
                navigate('/my', { state: { loginSuccess: true } });
            })

            // 실패 시
            .catch(error => {
                if (error.response?.data) {
                    // 요청 설정 중에 에러가 발생한 경우
                    toast.info(error.response.data.detail, toastcode(3000));
                    toast.clearWaitingQueue();
                } else {
                    // 서버와의 통신 자체가 실패한 경우
                    toast.error('서버와 통신할 수 없습니다: ' + error.message, toastcode(3000));
                    toast.clearWaitingQueue();
                }
            });
    };

    return (
        <>
            <div className="login-overlay">
                <div className="login-container">
                    {/* 모달 헤더 */}
                    <div className="login-header">
                        <h1 className="login-title">Oh!Yes</h1>
                    </div>

                    {/* 소셜 로그인 섹션 */}
                    <div className="social-login-section">
                        <p className="social-login-title">소셜 로그인</p>
                    
                        <div className="social-login-buttons">
                            {/* 구글 로그인 버튼 */}
                            <Earth img={GoogleIcon} alt="login with Google" href={"https://growmoney.duckdns.org/oauth2/authorization/google"} />
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="login-divider"></div>

                    {/* 모달 본문 */}
                    <div className="login-body">
                        {/* 로그인 폼 */}
                        <form className="login-form">
                            <input type="text" className="login-input" placeholder="아이디" value={sendData.username} onChange={onChangeId} />
                            <input type="password" className="login-input" placeholder="비밀번호" value={sendData.password} onChange={onChangePassword} />
                            
                            {/* 로그인 버튼 */}
                            <button className="login-button" type="submit" onClick={handleLogin}>로그인</button>
                            <p className="login-forgot-password">아이디/비밀번호 재설정</p>
                            <p className="login-signup-link">계정이 없으신가요? <a className="login-link" href="/signup">회원가입</a></p>
                        </form>

                        {/* 구분선 */}
                        <div className="login-divider"></div>

                        {/* 약관 텍스트 */}
                        <div className="login-terms">
                            <p>The Google <a className="login-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a className="login-link" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};