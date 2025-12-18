import React from 'react';
import '/Users/dgsw2025/Oh!Yes/grow-up-money-web/src/components/css/Shop/ShopShop.css';
import diamond from "../../../img/Icon/diamond.svg";

export default function StorePage() {
    const products = Array(15).fill({
        name: '[프로필 배너] 강아지',
        price: 1000
    });

    return (

            <div className="store-container">

                <div className="products-container">
                    <div className="product-row">
                        {products.slice(0, 5).map((product, index) => (
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
                        ))}
                    </div>

                    <div className="product-row">
                        {products.slice(5, 10).map((product, index) => (
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
                        ))}
                    </div>

                    <div className="product-row">
                        {products.slice(10, 15).map((product, index) => (
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
                        ))}
                    </div>
                </div>
            </div>
        
    );
}