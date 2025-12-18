import {React, useCallback} from 'react';
import '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/components/css/Shop/ShopShop.css';
import diamond from "../../../img/Icon/diamond.svg";

const TOSS_CLIENT_KEY =
    import.meta.env.VITE_TOSS_CLIENT_KEY ||
    "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";

function Planpages() {
    /* =========================
        결제 결과 알람 처리
       ========================= */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const result = params.get("result");

        if (result === "success") {
            alert("결제가 성공적으로 완료되었습니다.");
            window.history.replaceState({}, "", "/more");
        }

        if (result === "fail") {
            alert("결제가 실패되었습니다.");
            window.history.replaceState({}, "", "/more");
        }
    }, []);

    const handlePayment = useCallback((plan) => {
        const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);

        tossPayments.requestPayment("카드", {
            amount: plan.price,
            orderId: `order_${Date.now()}`,
            orderName: `Grow Money ${plan.name}`,
            successUrl: `${window.location.origin}/plan?result=success`,
            failUrl: `${window.location.origin}/plan?result=fail`,
        });
    }, []);

    // ... 나머지 컴포넌트 구현부
}

export default function StorePage() {
    const products = Array(15).fill({
        name: '[프로필 배너] 강아지',
        price: 1000
    });

    const renderProductCard = (product, index) => (
        <div key={index} className="product-wrapper">
            <div className="product-card">
                <div className="product-image"></div>

                <div className="product-info">
                    <div className="info-content">
                        <div className="product-name">{product.name}</div>

                        <div className="price-container">
                            <div className="price-content">
                                <div className="diamond-icon"></div>
                                <div className="price-text" onclick=''>{product.price}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProductRow = (products, startIndex) => (
        <div className="product-row">
            {products.slice(startIndex, startIndex + 5).map(renderProductCard)}
        </div>
    );

    return (
        <div className="store-container">
            <div className="products-container">
                {renderProductRow(products, 0)}
                {renderProductRow(products, 5)}
                {renderProductRow(products, 10)}
            </div>
        </div>
    );
}
