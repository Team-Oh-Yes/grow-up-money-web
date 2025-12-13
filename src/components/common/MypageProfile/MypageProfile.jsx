// Link import
import '../../css/MypageProfile/MypageProfile.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Img import
import PremiumImg from '../../../img/MypageProfile/PremiumImg.svg';
import ProfileIcon from '../../../img/MypageProfile/테스트프로필.png';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Components import
import MypageHeader from './MypageHeader';

// Const
export default function MypageProfile() {
    return (
        <div className='mypage-profile-container'>

            <MypageHeader />
            <div className='mypage-main'>
                <div className='profile-setting-title'>
                    프로필 설정 <img src={PremiumImg} alt="Premium" />
                </div>

                <div className='line'></div>

                <div className='profile-picture-title'>프로필 사진</div>
                <div className='profile-picture'>
                    <img className='profile-icon' src={ProfileIcon} alt="Profile" />
                </div>
            </div>
        </div>
    );
}