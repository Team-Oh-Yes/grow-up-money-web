import React from "react";
import '../../css/Serviccenter/FaQ.css';

function Announcement() {
    return (
        <div>
            <header className="menuBar">
                <h1>고객 지원</h1>
                <nav className="menuNav">
                    <ul>
                        <li><a href="/">메인 페이지</a></li>
                        <li><a href="/servicecenter/notice">공지사항</a></li>
                        <li><a href="/servicecenter/faq" className="active">자주 묻는 질문</a></li>
                        <li><a href="/servicecenter/qna">1:1 문의</a></li>
                        <li><a href="/servicecenter/eula">이용약관</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <nav className="bgGradient">
                    <h2>자주 묻는 질문</h2>
                    <p>GROW MONEY의 자주 묻는 질문을 확인하세요. 만약에 해결되지 않은 경우, 고객 지원팀에 문의해 주세요.</p>
                </nav>
                <nav className="contents">
                    <details className="noticeItem">
                        <summary>
                            FT가 뭔가요? <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>FT는 GROW MONEY에서 가상으로 사용되는 유사 NFT입니다. FT는 "에쁘띠"를 영어로 표기한 단어이고, FT는 로드맵에서 한 단원을 끝낼시, 뽑기로 얻을 수 있는 것입니다.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            계정이 정지당했어요. <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>계정이 정지된 경우, 대부분은 이용 약관에 따라 이루어진 조치입니다. 혹시 이유가 이해되지 않거나 이의가 있으시면, 고객 지원팀으로 연락해 주세요.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            플랜 환불은 어떻게 하나요? <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <h3>1. 월별 구독</h3>
                            <ul>
                                <li>구독 시작 후 <strong>7일 이내</strong>에는 결제한 금액을 <strong>전액 환불</strong> 받을 수 있습니다.</li>
                                <li>7일 이후에는 사용 일수에 따라 환불 금액이 계산됩니다.</li>
                                <li>예시: 월 구독료가 10,000원일 경우
                                <ul>
                                    <li>사용 8~15일: 10,000원 × 70% = 7,000원 환불</li>
                                    <li>사용 16~23일: 10,000원 × 40% = 4,000원 환불</li>
                                    <li>사용 24~30일: 10,000원 × 10% = 1,000원 환불</li>
                                </ul>
                                </li>
                            </ul>

                            <h3>2. 일회성 구독</h3>
                            <ul>
                                <li>구입 후 <strong>3일 이내</strong>에는 전액 환불 가능합니다.</li>
                                <li>3일 이후에는 환불이 불가능합니다.</li>
                            </ul>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            비밀번호를 잊어버렸어요. <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>비밀번호 재설정 페이지로 이동하여 이메일 주소를 입력하면 비밀번호 재설정 링크가 포함된 이메일이 발송됩니다. 이메일을 확인하고 지침에 따라 비밀번호를 재설정하세요.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            회원 탈퇴는 어떻게 하나요? <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>회원 탈퇴를 원하시면 계정 설정 페이지로 이동하여 '회원 탈퇴' 옵션을 선택하세요. 탈퇴 절차를 완료하면 계정이 영구적으로 삭제됩니다.</p>
                        </div>
                    </details>

                </nav>
            </main>
            <div className="footer2">
                <h2>GROW UP MONEY</h2>
                <hr></hr>
                <p className="D">
                <a href="/servicecenter/eula" target="_blank" rel="noopener noreferrer">이용약관</a> |
                <a href="/no-terms" target="_blank" rel="noopener noreferrer"> 무이용약관</a> |
                <a href="/privacy" target="_blank" rel="noopener noreferrer"> 개인정보처리방침</a> |
                <a href="/policy" target="_blank" rel="noopener noreferrer"> 책임준수정책</a>
                </p>
                <p>대구광역시 달성군 구지면 창리로11길 93</p>
                <p>© Oh! YeeSi | GROW UP MONEY</p>
            </div>
        </div>
    );
}

export default Announcement;
