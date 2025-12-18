import { useState, useEffect } from 'react';

export default function UnderDevelopment() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @keyframes ping {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dev-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #ffedd5 0%, #fef3c7 50%, #fef9c3 100%);
                    padding: 1rem;
                    position: relative;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                }

                .dev-content {
                    text-align: center;
                    position: relative;
                    z-index: 10;
                    animation: fadeIn 0.8s ease-out;
                }

                .dev-icon-wrapper {
                    margin-bottom: 2rem;
                    position: relative;
                    display: inline-block;
                }

                .dev-icon-box {
                    width: 8rem;
                    height: 8rem;
                    background: linear-gradient(135deg, #fb923c, #f59e0b);
                    border-radius: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 25px 50px -12px rgba(251, 146, 60, 0.4);
                    animation: bounce 2s ease-in-out infinite;
                }

                .dev-icon-box svg {
                    width: 4rem;
                    height: 4rem;
                    color: white;
                }

                .dev-sparkle-top {
                    position: absolute;
                    top: -0.5rem;
                    right: -0.5rem;
                    width: 1.5rem;
                    height: 1.5rem;
                    background: #fb923c;
                    border-radius: 50%;
                    animation: ping 2s ease-in-out infinite;
                }

                .dev-sparkle-bottom {
                    position: absolute;
                    bottom: -0.5rem;
                    left: -0.5rem;
                    width: 1rem;
                    height: 1rem;
                    background: #f59e0b;
                    border-radius: 50%;
                    animation: pulse 3s ease-in-out infinite;
                }

                .dev-title {
                    font-size: 3rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    background: linear-gradient(90deg, #ea580c, #d97706, #ca8a04);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .dev-sub-text {
                    font-size: 1.25rem;
                    color: #6b7280;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .dev-progress-wrapper {
                    max-width: 28rem;
                    margin: 0 auto 2rem;
                }

                .dev-progress-bg {
                    height: 0.75rem;
                    background: #e5e7eb;
                    border-radius: 9999px;
                    overflow: hidden;
                }

                .dev-progress-fill {
                    height: 100%;
                    width: 66.666%;
                    background: linear-gradient(90deg, #f97316, #f59e0b, #eab308);
                    border-radius: 9999px;
                    animation: pulse 2s ease-in-out infinite;
                }

                .dev-icon-grid {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .dev-icon-card {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease-out;
                    cursor: pointer;
                    font-size: 1.5rem;
                }

                .dev-icon-card:nth-child(1) { background: #ffedd5; }
                .dev-icon-card:nth-child(2) { background: #fef3c7; }
                .dev-icon-card:nth-child(3) { background: #fef9c3; }

                .dev-icon-card:hover {
                    transform: scale(1.1);
                }

                .dev-description {
                    color: #6b7280;
                    max-width: 28rem;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }

                .dev-back-button {
                    margin-top: 2rem;
                    padding: 0.75rem 2rem;
                    background: linear-gradient(90deg, #f97316, #f59e0b);
                    color: white;
                    border-radius: 9999px;
                    font-weight: 600;
                    border: none;
                    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease-out;
                    font-size: 1rem;
                }

                .dev-back-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.4);
                }

                .dev-floating-circle {
                    position: absolute;
                    border-radius: 50%;
                }

                .dev-circle-1 {
                    top: 5rem;
                    left: 5rem;
                    width: 5rem;
                    height: 5rem;
                    background: #fed7aa;
                    opacity: 0.3;
                    animation: pulse 4s ease-in-out infinite;
                }

                .dev-circle-2 {
                    bottom: 5rem;
                    right: 5rem;
                    width: 8rem;
                    height: 8rem;
                    background: #fde68a;
                    opacity: 0.2;
                    animation: bounce 3s ease-in-out infinite;
                }

                .dev-circle-3 {
                    top: 10rem;
                    right: 10rem;
                    width: 4rem;
                    height: 4rem;
                    background: #fef08a;
                    opacity: 0.25;
                    animation: ping 3s ease-in-out infinite;
                }

                @media (max-width: 768px) {
                    .dev-title {
                        font-size: 2rem;
                    }

                    .dev-icon-box {
                        width: 6rem;
                        height: 6rem;
                    }

                    .dev-icon-box svg {
                        width: 3rem;
                        height: 3rem;
                    }
                }
            `}</style>

            <div className="dev-container">
                <div className="dev-content">
                    <div className="dev-icon-wrapper">
                        <div className="dev-icon-box">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div className="dev-sparkle-top"></div>
                        <div className="dev-sparkle-bottom"></div>
                    </div>

                    <h1 className="dev-title">개발 준비중</h1>
                    
                    <p className="dev-sub-text">
                        더 나은 서비스를 위해 열심히 준비하고 있어요{dots}
                    </p>

                    <div className="dev-progress-wrapper">
                        <div className="dev-progress-bg">
                            <div className="dev-progress-fill"></div>
                        </div>
                    </div>

                    <div className="dev-icon-grid">
                        <div className="dev-icon-card">🚀</div>
                        <div className="dev-icon-card">⚡</div>
                        <div className="dev-icon-card">✨</div>
                    </div>

                    <p className="dev-description">
                        곧 멋진 기능들과 함께 찾아뵙겠습니다.<br />
                        조금만 기다려주세요! 🎉
                    </p>

                    <button className="dev-back-button" onClick={() => window.history.back()}>
                        이전 페이지로 돌아가기
                    </button>
                </div>

                <div className="dev-floating-circle dev-circle-1"></div>
                <div className="dev-floating-circle dev-circle-2"></div>
                <div className="dev-floating-circle dev-circle-3"></div>
            </div>
        </>
    );
}