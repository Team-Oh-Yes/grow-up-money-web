import { useCallback, useEffect } from "react";
import '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/components/css/Shop/ShopShop.css';
import points from '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/img/point.png';
import axiosInstance from "../../api/axiosInstance";
import { toast } from 'react-toastify'; 

export default function StorePage() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const result = params.get("result");

        if (result === "success") {
            toast.success("구매가 성공적으로 완료되었습니다.");
            window.history.replaceState({}, "", window.location.pathname);
        }

        if (result === "fail") {
            toast.error("구매가 실패되었습니다.");
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, []);

    const handlePurchase = useCallback(async (product) => {
        try {
            await axiosInstance.post(`/shop/items/${product.id}/purchase`);
            toast.success(`${product.name}을(를) 성공적으로 구매했습니다!`);
            
        } catch (error) {
            console.error("아이템 구매 실패:", error);
            toast.error(error.response?.data?.message || "아이템 구매에 실패했습니다.");
        }
    }, []);

    const products = Array(15).fill(null).map((_, i) => ({
        id: i + 1, // 실제 아이템 ID로 변경 필요
        name: `[프로필 배너] 강아지 ${i + 1}`,
        price: 1000
    }));

    const renderProductCard = (product, index) => (
        <div key={index} className="product-wrapper">
            <div className="product-card" onClick={() => handlePurchase(product)}>
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