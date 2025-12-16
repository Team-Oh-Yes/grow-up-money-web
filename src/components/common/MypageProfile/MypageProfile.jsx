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
import MypageProfileContent from './MypageProfileContent';
import MypageInfoContent from './MypageInfoContent';

// Const
export default function MypageProfile() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 초기 로딩 시뮬레이션
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 120);

        return () => clearTimeout(timer);
    }, []);

    const handleTabChange = (tabId) => {
        setIsLoading(true);
        setActiveTab(tabId);
        
        // 탭 변경 시 로딩 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
        }, 120);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className='mypage-main loading-container'>
                    <div className='spinner'></div>
                </div>
            );
        }

        switch (activeTab) {
            case 'profile':
                return <MypageProfileContent />;
            case 'status':
                return <div className='mypage-main'>사용자 통계</div>;
            case 'billing':
                return <div className='mypage-main'>청구 설정</div>;
            case 'info':
                return <MypageInfoContent />;
            case 'refund':
                return <div className='mypage-main'>환불/문의</div>;
            default:
                return <MypageProfileContent />;
        }
    };

    return (
        <div className='mypage-profile-container'>
            <MypageHeader activeTab={activeTab} onTabChange={handleTabChange} />
            {renderContent()}
        </div>
    );
}