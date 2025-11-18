import React from 'react';
import '../../css/Serviccenter/ELUA.css';

function EULA() {
    return (
        <div>
            <header className="menuBar">
                <h1>고객 지원</h1>
                <nav className="menuNav">
                    <ul>
                        <li><a href="/">메인 페이지</a></li>
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
                <div className='mainText'>
                    <h1>제1조 (목적)</h1>
                    <p>본 최종 사용자 라이선스 계약("계약")은 귀하("사용자")와 [Oh!Yes] ("회사") 간에 체결되며, 회사가 제공하는 소프트웨어 제품("GROW MONEY")의 사용과 관련된 권리와 의무를 규정합니다. 소프트웨어를 설치하거나 사용하는 경우, 귀하는 본 계약의 조건에 동의하는 것으로 간주됩니다.</p>

                    <h1>제2조 (정의)</h1>
                    <p style={{ lineHeight: '1.2' }}>
                        1. “서비스”란 이용자가 PC, 모바일, 기타 기기를 통해 이용할 수 있는 경제 학습 콘텐츠, 커뮤니티, 퀴즈, 강의 등의 모든 서비스를 의미합니다.<br />
                        2. “회사”란 서비스를 개발하고 배포한 집단을 의미합니다. <br />
                        3. “회원”이란 본 약관에 동의하고 서비스 이용을 신청하여 승인을 받은 자를 의미합니다. <br />
                        4. “콘텐츠”란 서비스에서 제공하는 텍스트, 이미지, 영상, 음성 등 일체의 자료를 말합니다. <br />
                    </p>

                    <h1>제3조 (약관의 효력 및 변경)</h1>
                    <p style={{ lineHeight: '1.2' }}>
                        1. 본 약관은 회원이 서비스에 가입할 때 동의함으로써 효력이 발생합니다. <br />
                        2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 변경 시 사전에 공지합니다. <br />
                        3. 변경된 약관에 동의하지 않을 경우 회원은 서비스 이용을 중단하고 탈퇴할 수 있습니다. <br />
                    </p>

                    <h1>제4조 (회원가입 및 계정 관리)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 이용자는 회사가 정한 가입 절차에 따라 회원정보를 입력하고 약관에 동의해야 합니다. <br />
                        2. 회원은 본인의 계정 정보를 제3자에게 양도하거나 대여할 수 없습니다. <br />
                        3. 회원정보가 변경된 경우 즉시 수정해야 하며, 이를 게을리하여 발생한 불이익에 대해 회사는 책임을 지지 않습니다. <br />
                    </p>

                    <h1>제5조 (서비스의 제공 및 변경)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 회사는 경제 학습 콘텐츠 제공, 커뮤니티 운영, 강의 서비스 등을 제공합니다. <br />
                        2. 서비스 내용은 회사의 정책 및 운영 사정에 따라 변경될 수 있습니다. <br />
                        3. 회사는 서비스의 품질 향상을 위해 일시적으로 서비스를 중단할 수 있으며, 사전에 이를 공지합니다. <br />
                    </p>

                    <h1>제6조 (회원의 의무)</h1>
                    <p>회원은 다음 행위를 하여서는 안 됩니다. 이에 따른 제재가 이루어 질 수 있습니다.</p>
                    <p style={{lineHeight: '1.2'}}>
                        1. 타인의 계정 또는 개인정보를 도용하는 행위 <br />
                        2. 서비스 내 불법적이거나 음란한 콘텐츠 게시 <br />
                        3. 저작권 등 제3자의 권리를 침해하는 행위 <br />
                        4. 서비스 운영을 방해하거나 서버에 과도한 부하를 주는 행위 <br />
                    </p>

                    <h1>제7조 (콘텐츠의 저작권)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 서비스에서 제공하는 콘텐츠의 저작권은 회사 또는 콘텐츠 제공자에게 귀속됩니다. <br />
                        2. 회원이 작성한 게시물의 저작권은 회원에게 있으나, 회사는 서비스 운영, 홍보를 위해 이를 활용할 수 있습니다. <br />
                    </p>

                    <h1>제8조 (이용 제한 및 계약 해지)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 회사는 회원이 약관을 위반하거나 불법 행위를 한 경우, 서비스 이용을 제한하거나 회원 자격을 박탈할 수 있습니다.
                        2. 회원은 언제든지 계정 설정을 통해 탈퇴할 수 있습니다. <br />
                        3. 탈퇴 시 회원의 모든 데이터는 삭제되며, 복구가 불가능할 수 있습니다. <br />
                    </p>

                    <h1>제9조 (면책조항)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 회사는 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다. <br />
                        2. 회사는 회원 상호 간의 분쟁, 또는 회원이 제공한 정보의 신뢰성 등에 대해 책임을 지지 않습니다. <br />
                    </p>

                    <h1>제10조 (분쟁 해결 및 준거법)</h1>
                    <p style={{lineHeight: '1.2'}}>
                        1. 본 약관은 대한민국 법률에 따라 해석되고 적용됩니다. <br />
                        2. 서비스 이용과 관련하여 발생한 분쟁은 회사의 본사 소재지를 관할하는 법원을 제1심 법원으로 합니다. <br />
                    </p>
                </div>
            </main>
            <div className="footer">
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

export default EULA;