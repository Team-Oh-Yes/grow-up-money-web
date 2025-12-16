// Link import
import '../../css/MypageProfile/MypageInfoContent.css';
import { useState } from 'react';

// Img import
import ProfileIcon from '../../../img/MypageProfile/테스트프로필.png';

// Const
export default function MypageInfoContent() {
    const [nickname, setNickname] = useState('세트덩어리');
    const [intro, setIntro] = useState('안녕하세요');

    return (
        <div className='mypage-main'>
            <div className='Info-title'>
                개인정보 변경
            </div>

            <div className='line'></div>
            
            <div className='Info-content'>
                <div className='Info-content-item'>
                    <div className='Info-setting-title'>아이디(ID)</div>

                    <div className='Info-setting-text'>세트덩어리</div>
                </div>

                <div className='Info-content-item'>
                    <div className='Info-setting-title'>이메일(Email)</div>

                    <div className='Info-setting-text'>help@ohyes.com</div>

                    <div className='email-button'>인증하기</div>
                </div>

                <div className='Info-content-item'>
                    <div className='Info-setting-title'>비밀번호(PW)</div>

                    <div className='Info-setting-text'>69740 포인트</div>
                </div>
            </div>
        </div>
    );
}
