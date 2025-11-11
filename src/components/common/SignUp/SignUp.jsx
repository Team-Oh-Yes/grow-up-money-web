import React from 'react';
import '../../css/LoginAndSignUp/SignUp.css';
import GoogleIcon from '../../../img/Google-icon.png';
import BindIcon from '../../../img/BIND-icon.png';

const LoginAndSignup = () => {
    return (
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
                        <button className="social-signup-btn google-btn">
                            <img src={GoogleIcon} alt="Google" className="social-signup-icon" />
                        </button>
                    
                        {/* 네이버 회원가입 버튼 */}
                        <button className="social-signup-btn naver-btn">
                            <img src={BindIcon} alt="BIND" className="social-signup-icon" />
                        </button>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="signup-divider"></div>

                {/* 모달 본문 */}
                <div className="signup-body">
                    {/* 회원가입 폼 */}
                    <div className="signup-form">
                        <input type="text" className="signup-input" placeholder="아이디" />
                        <input type="password" className="signup-input" placeholder="비밀번호" />
                        <input type="password" className="signup-input" placeholder="비밀번호 확인" />

                        {/* 회원가입 버튼 */}
                        <button className="signup-button">회원가입</button>
                        <p className="signup-login-link">이미 계정이 있으신가요? <a href="#" className="signup-link">로그인</a></p>
                    </div>

                    {/* 구분선 */}
                    <div className="signup-divider"></div>

                    {/* 약관 텍스트 */}
                    <div className="signup-terms">
                        <p>The Google <a href="#" className="signup-link">Privacy Policy</a> and <a href="#" className="signup-link">Terms of Service</a> apply.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAndSignup;
