import React from 'react';
import '../../css/Serviccenter/ELUA.css';

function EULA() {
    return (
        <div>
            <header className="menuBar">
                <h1>고객 지원</h1>
                <nav>
                    <ul>
                        <li><a href="/servicecenter/notice">공지사항</a></li>
                        <li><a href="/servicecenter/faq">자주 묻는 질문</a></li>
                        <li><a href="/servicecenter/qna">1:1 문의</a></li>
                        <li><a href="/servicecenter/eula" className="active">이용약관</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1 className='eulaTitle'>최종 사용자 라이선스 계약</h1>
                <div className='line'></div>
            </main>
            
        </div>
        
    );
}

export default EULA;