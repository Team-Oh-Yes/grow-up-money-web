// Link import
import '../../css/MypageProfile/MypageHeader.css';

// Const
export default function MypageHeader({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'profile', label: '프로필' },
        { id: 'status', label: '사용자 통계' },
        { id: 'billing', label: '청구 설정' },
        { id: 'info', label: '개인정보 변경' },
        { id: 'refund', label: '환불/문의' },
    ];

    return (
        <div className='mypage-header-container'>
            <div className='mypage-header-button'>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`clickbutton ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
