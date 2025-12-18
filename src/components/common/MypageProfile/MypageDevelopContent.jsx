// Link import
import '../../css/MypageProfile/MypageDevelopContent.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Const
export default function MypageDevelopContent() {
    return (
        <div className='mypage-main'>
            <div className='develop-mypage-main'>
                <div className='develop-mypage-title'>
                    공사중
                </div>
            </div>
        </div>
    );
}
