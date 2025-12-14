// Link import
import '../../css/MypageProfile/MypageProfileContent.css';
import { useState } from 'react';

// Img import
import PremiumImg from '../../../img/MypageProfile/PremiumImg.svg';
import ProfileIcon from '../../../img/MypageProfile/테스트프로필.png';

// Const
export default function MypageProfileContent() {
    const [nickname, setNickname] = useState('세트덩어리');
    const [intro, setIntro] = useState('안녕하세요');

    return (
        <div className='mypage-main'>
            <div className='profile-setting-title'>
                프로필 설정 <img src={PremiumImg} alt="Premium" />
            </div>

            <div className='line'></div>

            <div className='profile-picture-title'>프로필 사진</div>

            <div className='profile-picture-container'>
                <div className='profile-picture'>
                    <img className='profile-icon' src={ProfileIcon} alt="Profile" />
                </div>
                <div className='profile-upload-container'>
                    <div className='profile-upload-button'>사진 업로드</div>
                    <div className='profile-upload-text'>키타가와마린.png</div>
                </div>
            </div>
            
            <div className='profile-info-container'>
                <div className='profile-nickname-container'>
                    <div className='profile-nickname-title'>닉네임</div>
                    <input className='profile-nickname-input' type="text" placeholder='닉네임을 입력해주세요' value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>

                <div className='profile-intro-container'>
                    <div className='profile-intro-title'>소개글</div>
                    
                    <textarea className='profile-intro-textarea' placeholder='소개글을 입력해주세요' value={intro} onChange={(e) => setIntro(e.target.value)} maxLength={250} />
                    
                    <div className='profile-intro-text-count'>({intro.length} / 250)</div>
                </div>
                
                <div className='profile-save-button-container'>
                    <div className='profile-button-save profile-button'>저장</div>
                    <div className='profile-button-cancel profile-button'>취소</div>
                </div>
            </div>
        </div>
    );
}
