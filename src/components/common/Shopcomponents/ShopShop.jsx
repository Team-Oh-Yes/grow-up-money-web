import React from 'react';
import '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/components/css/Shop/ShopShop.css';
import diamond from "../../../img/Icon/diamond.svg";

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
                                <div className="price-text">{product.price}</div>
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
