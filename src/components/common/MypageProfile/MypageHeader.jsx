// Link import
import '../../css/MypageProfile/MypageHeader.css';

// Const
export default function MypageHeader() {
    return (
        <div className='mypage-header-container'>
            <div className='mypage-header-button'>
                <div className='main-profile clickbutton'>프로필</div>
                <div className='status-profile clickbutton'>사용자 통계</div>
                <div className='money-profile clickbutton'>청구 설정</div>
                <div className='info-profile clickbutton'>개인정보 변경</div>
                <div className='refund-profile clickbutton'>환불/문의</div>
            </div>
        </div>
    );
}
