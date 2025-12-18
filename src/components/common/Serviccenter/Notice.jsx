import '../../css/Serviccenter/Notice.css';

function Notice() {
    return (
        <div>
            <header className="menuBar">
                <h1>고객 지원</h1>
                <nav className="menuNav">
                    <ul>
                        <li><a href="/servicecenter/notice" className="active">공지사항</a></li>
                        <li><a href="/servicecenter/faq">자주 묻는 질문</a></li>
                        <li><a href="/servicecenter/qna">1:1 문의</a></li>
                        <li><a href="/servicecenter/eula">이용약관</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <nav className="bgGradient">
                    <h2>공지사항</h2>
                    <p>GROW MONEY의 최신 공지사항을 확인하세요.</p>
                </nav>
                <nav className="contents">
                    <details className="noticeItem">
                        <summary>
                            TossPayments 추가 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>TossPayments로 결제수단이 확장되었습니다. 해외결제를 포함한 27개의 카드사 결제가 가능합니다.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            서버 점검 안내 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 원활한 서비스 제공을 위해 2025년 11월 25일(월) 오전 2시부터 오전 5시까지 서버 점검이 예정되어 있습니다. 이 시간 동안 서비스 이용이 일시적으로 제한될 수 있으니 양해 부탁드립니다.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            플랜 변경 가격 업데이트 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 사용자 편의를 위해 플랜 변경 정책이 업데이트되었습니다. 가격은 월정액이 8900이 1900으로 조정되었고, 영구는 14900원이 4900원으로 조정되었습니다.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            Pay가 추가되었습니다. <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 사용자 편의를 위해 결제 수단이 추가되었습니다. 이제 Pay를 이용하여 결제하실 수 있습니다.</p>
                            <p>단, Pay는 macOS 10.12 Sierra 이상, 브라우저는 Safari에서만 지원되며, iCloud 계정및 카드가 연결이 되어야 합니다. 자세한 내용은 apple.com을 확인하십시오.</p>
                        </div>
                    </details>

                    <details className="noticeItem">
                        <summary>
                            베타 테스터 모집 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 더 나은 서비스를 개발하기 위해 배타테스터를 모집합니다. 자세한 내용은 관리자에게 문의하십시오</p>
                        </div>
                    </details>
                </nav>
            </main>
        </div>
    );
}

export default Notice;