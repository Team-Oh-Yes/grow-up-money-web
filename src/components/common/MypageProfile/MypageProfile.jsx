// Link import
import '../../css/MypageProfile/MypageProfile.css';
import { useState, useEffect } from 'react';

// Components import
import MypageHeader from './MypageHeader';
import MypageProfileContent from './MypageProfileContent';
import MypageInfoContent from './MypageinfoContent';
import MypageDevelopContent from './MypageDevelopContent';

// Const
export default function MypageProfile() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 초기 로딩 시뮬레이션
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 20);

        return () => clearTimeout(timer);
    }, []);

    const handleTabChange = (tabId) => {
        setIsLoading(true);
        setActiveTab(tabId);
        
        // 탭 변경 시 로딩 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
        }, 20);
    };
//왜 안되냐
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
                return <MypageDevelopContent />; 
            case 'billing':
                return <MypageDevelopContent />;
            case 'info':
                return <MypageInfoContent />;
            case 'refund':
                return <MypageDevelopContent />;
            default:
                return <MypageProfileContent />;
        }
    };

    return (
        <div className='mypage-profile-main-container' >
            <MypageHeader activeTab={activeTab} onTabChange={handleTabChange} />
            <div className='mypage-profile-container'>
                {renderContent()}
            </div>
        </div>
    );
}