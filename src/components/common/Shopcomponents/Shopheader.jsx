// Link import
import '../../css/ShopComponents/ShopHeader.css';

// Const
export default function ShopHeader({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'shop', label: '재화 상점' },
        { id: 'goods', label: '굿즈 구매' },
        { id: 'points', label: '포인트 구매' },
        { id: 'random', label: '행운 뽑기' },
    ];

    return (
        <div className='shop-header-container'>
            <div className='shop-header-button'>
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
