import '../../css/more/more.css';

function More() {
    return (
        <div className="more-container">
            <h1 className="more-title">더보기</h1>
            <a href="/">
                <div className="more-contents1">
                    <h1>메인 화면으로 돌아가기</h1>
                </div>
            </a>
            <a href="/plan">
                <div className="more-contents2">
                    <h1>플랜 변경</h1>
                </div>
            </a>
            <div className="more-contents3">
                <h1>비밀번호 변경</h1>
            </div>
            <div className="more-contents4">
                <h1>계정 삭제</h1>
            </div>
        </div>
    );
}

export default More;