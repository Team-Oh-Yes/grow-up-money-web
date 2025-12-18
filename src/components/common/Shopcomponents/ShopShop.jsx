import { useCallback, useEffect } from "react";
// CSS 경로는 환경에 맞게 확인해주세요.
import '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/components/css/Shop/ShopShop.css';
import points from '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/img/point.png';

const TOSS_CLIENT_KEY =
    import.meta.env.VITE_TOSS_CLIENT_KEY ||
    "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";

export default function StorePage() {
    /* =========================
        결제 결과 알람 처리
       ========================= */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const result = params.get("result");

        if (result === "success") {
            alert("결제가 성공적으로 완료되었습니다.");
            // 결과 확인 후 URL 파라미터 제거
            window.history.replaceState({}, "", window.location.pathname);
        }

        if (result === "fail") {
            alert("결제가 실패되었습니다.");
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, []);

    /* =========================
        토스 페이먼츠 결제 실행
       ========================= */
    const handlePayment = useCallback((product) => {
        // window.TossPayments가 로드되었는지 확인이 필요합니다.
        if (!window.TossPayments) {
            alert("결제 모듈을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);

        tossPayments.requestPayment("카드", {
            amount: product.price,
            orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, 
            orderName: product.name,
            successUrl: `${window.location.origin}/plan?result=success`,
            failUrl: `${window.location.origin}/plan?result=fail`,
        });
    }, []);

    const products = Array(15).fill(null).map((_, i) => ({
        id: i,
        name: `[프로필 배너] 강아지 ${i + 1}`,
        price: 1000
    }));

    const renderProductCard = (product, index) => (
        <div key={index} className="product-wrapper">
            <div className="product-card" onClick={() => handlePayment(product)}>
                <div className="product-image"></div>

                <div className="product-info">
                    <div className="info-content">
                        <div className="product-name">{product.name}</div>

                        <div className="price-container">
                            <div className="price-content">
                                <img src={points} alt="points" />
                                <div className="price-text">{product.price.toLocaleString()}원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProductRow = (products, startIndex) => (
        <div className="product-row" key={`row-${startIndex}`}>
            {products.slice(startIndex, startIndex + 5).map((product, idx) => 
                renderProductCard(product, startIndex + idx)
            )}
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