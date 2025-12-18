// Link import
import '../../css/ShopComponents/ShopComponents.css';
import { useState, useEffect } from 'react';

// Components import
import ShopHeader from './Shopheader.jsx';
import ShopContent from './ShopContent.jsx';

// Const
export default function ShopComponents() {
    const [activeTab, setActiveTab] = useState('shop');
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

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className='shop-main loading-container'>
                    <div className='spinner'></div>
                </div>
            );
        }

        switch (activeTab) {
            case 'shop':
                return <ShopContent />;
            case 'goods':
                return <ShopContent />; 
            case 'points':
                return <ShopContent />;
            case 'random':
                return <ShopContent />;
            default:
                return <ShopContent />;
        }
    };

    return (
        <div className='shop-main-container' >
            <ShopHeader activeTab={activeTab} onTabChange={handleTabChange} />
            <div className='shop-container'>
                {renderContent()}
            </div>
        </div>
    );
}