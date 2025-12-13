// Link import
import '../../css/MypageProfile/MypageProfile.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Components import
import MypageHeader from './MypageHeader';

// Const
export default function MypageProfile() {
    return (
        <div className='mypage-profile-container'>

            <MypageHeader />
            <div>여기는 마이페이지입니다.</div>
        </div>
    );
}