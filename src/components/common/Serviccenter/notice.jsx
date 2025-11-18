import React from "react";
import '../../css/Serviccenter/Announcement.css';

function Announcement() {
    return (
        <div>
            <header className="menuBar">
                <h1>고객 지원</h1>
                <nav className="menuNav">
                    <ul>
                        <li><a href="/">메인 페이지</a></li>
                        <li><a href="/servicecenter/notice" className="active">공지사항</a></li>
                        <li><a href="/servicecenter/faq">자주 묻는 질문</a></li>
                        <li><a href="/servicecenter/qna">1:1 문의</a></li>
                        <li><a href="/servicecenter/eula">이용약관</a></li>
                    </ul>
                </nav>
            </header>
            
        </div>
    );
}

export default Announcement;