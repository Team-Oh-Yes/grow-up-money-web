import { useState } from 'react';
import '../../css/ShopComponents/ShopPoints.css';
import points from '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/img/point.png';
import popo from '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/img/Icon/randomdia.svg';

export default function PointExchangePage() {
    const [currentPoints, setCurrentPoints] = useState(500);
    const [userBalance] = useState(5000);

    const pointPackages = [
        { id: 1, points: 500, price: 50000 },
        { id: 2, points: 1000, price: 100000 },
        { id: 3, points: 2500, price: 250000 },
        { id: 4, points: 5000, price: 500000 },
        { id: 5, points: 10000, price: 1000000 },
    ];

    const handlePurchase = (pkg) => {
        console.log(`구매: ${pkg.points} 포인트, ${pkg.price} 귀속 포인트`);
        // 구매 로직 추가
    };

    const handlePointsChange = (newPoints) => {
        setCurrentPoints(newPoints);
    };

    return (
        <>
            <div className="point-exchange-container">
                <div className="point-exchange-content">
                    <ExchangeHeader 
                        currentPoints={currentPoints}
                        userBalance={userBalance}
                        onPointsChange={handlePointsChange}
                    />
                    <PackagesGrid 
                        packages={pointPackages}
                        onPurchase={handlePurchase}
                    />
                </div>
            </div>
        </>
    );
}

// 헤더 컴포넌트
function ExchangeHeader({ currentPoints, userBalance, onPointsChange }) {
    return (
        <div className="exchange-header">
            <HeaderTitleBar />
            <HeaderContent 
                currentPoints={currentPoints}
                userBalance={userBalance}
                onPointsChange={onPointsChange}
            />
        </div>
    );
}

// 타이틀 바
function HeaderTitleBar() {
    return (
        <div className="header-title-bar">
            <h1 className="header-title">포인트 환전</h1>
        </div>
    );
}

// 헤더 컨텐츠
function HeaderContent({ currentPoints, userBalance, onPointsChange }) {
    return (
        <div className="header-content">
            <CurrentPointsBox 
                points={currentPoints}
                onPointsChange={onPointsChange}
            />
            <PurchaseInfo 
                points={currentPoints}
                balance={userBalance}
            />
        </div>
    );
}

// 현재 포인트 박스
function CurrentPointsBox({ points, onPointsChange }) {
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        onPointsChange(value ? parseInt(value) : 0);
    };

    return (
        <div className="current-points-box">
            <img src={popo} alt="points" className="diamond-icon-img" />
            <input 
                type="text"
                className="points-input"
                value={points}
                onChange={handleInputChange}
                placeholder="포인트 입력"
            />
        </div>
    );
}

// 구매 정보
function PurchaseInfo({ points, balance }) {
    const requiredBalance = points * 100;
    
    return (
        <div className="purchase-info">
            <PurchaseText points={points} requiredBalance={requiredBalance} />
            <BalanceButton balance={balance} />
        </div>
    );
}

// 구매 텍스트
function PurchaseText({ points, requiredBalance }) {
    return (
        <div className="purchase-text">
            <span className="purchase-label">
                구매하는 포인트 : {points} ({requiredBalance.toLocaleString()} 귀속 포인트)
            </span>
        </div>
    );
}

// 잔액 버튼
function BalanceButton({ balance }) {
    return (
        <button className="purchase-button">
            <img src={points} alt="points" className="balance-icon" />
            <span className="balance-text">{balance.toLocaleString()}</span>
        </button>
    );
}

// 패키지 그리드
function PackagesGrid({ packages, onPurchase }) {
    return (
        <div className="packages-grid">
            {packages.map((pkg) => (
                <PackageCard 
                    key={pkg.id}
                    package={pkg}
                    onPurchase={onPurchase}
                />
            ))}
        </div>
    );
}

// 패키지 카드
function PackageCard({ package: pkg, onPurchase }) {
    return (
        <div 
            className="package-card"
            onClick={() => onPurchase(pkg)}
        >
            <PackageIcon />
            <PackageFooter 
                points={pkg.points}
                price={pkg.price}
            />
        </div>
    );
}

// 패키지 아이콘
function PackageIcon() {
    return (
        <div className="package-icon-area">
            <img src={popo} alt="points" className="package-diamond-icon-img" />
        </div>
    );
}

// 패키지 푸터
function PackageFooter({ points, price }) {
    return (
        <div className="package-footer">
            <div className="package-info">
                <div className="package-points">{points.toLocaleString()} 포인트</div>
                <PackagePriceBox price={price} />
            </div>
        </div>
    );
}

// 가격 박스
function PackagePriceBox({ price }) {
    return (
        <div className="package-price-box">
            <img src={points} alt="points" className="money-icon" />
            <span className="package-price">{price.toLocaleString()} 귀속 포인트</span>
        </div>
    );
}