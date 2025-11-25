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
                            새로운 FT 출시 안내 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 새로운 FT "쇼핑 가방 괴물"이 출시되었습니다! 이번 FT는 로드맵의 특정 단원을 완료한 사용자에게 제공됩니다. 자세한 내용은 로드맵 페이지를 참고해 주세요.</p>
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
                            플랜 변경 정책 업데이트 <span className="arrow">▼</span>
                        </summary>
                        <div className='line'></div>
                        <div className="answer">
                            <p>안녕하세요, GROW MONEY입니다. 사용자 편의를 위해 플랜 변경 정책이 업데이트되었습니다. 플랜 환불은 1주인 이내 변경시 전액 환불 가능하며, 이후에는 부분 환불이 적용됩니다. 자세한 내용은 플랜 페이지에서 확인해 주세요.</p>
                        </div>
                    </details>
                </nav>
            </main>
        </div>
    );
}

export default Notice;