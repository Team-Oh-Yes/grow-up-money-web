import '../../css/Shop/Shop.css';

// Const
export default function ShopHeader({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'shop', label: '재화상점' },
        { id: 'status', label: '굿즈 구매' },
        { id: 'billing', label: '포인트 구매' },
        { id: 'info', label: '행운 뽑기' },
    ];

    return (
        <div className='S-container'>
            <div className='S-button'>
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
