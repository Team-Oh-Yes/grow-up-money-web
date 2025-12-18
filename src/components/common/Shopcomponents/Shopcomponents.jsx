// Link import
import { useEffect, useState } from "react";
import "../../css/ShopComponents/ShopComponents.css";
import ShopContent from "./ShopContent.jsx";
import ShopHeader from "./Shopheader.jsx";
import ShopGoods from "./ShopGoods.jsx";
import ShopRandom from "./ShopRandom.jsx";
import ShopShop from "./ShopShop.jsx";

// Const
export default function ShopComponents() {
    const [activeTab, setActiveTab] = useState("shop");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
            <div className="shop-main loading-container">
                <div className="spinner"></div>
            </div>
            );
        }

        switch (activeTab) {
            case "shop":
                return <ShopShop />;
            case "goods":
                return <ShopGoods />;
            case "points":
                return <ShopContent />;
            case "random":
                return <ShopRandom />;
            default:
                return <ShopRandom />;
        }
    };

    return (
        <div className="shop-main-container">
            <ShopHeader activeTab={activeTab} onTabChange={handleTabChange} />
            {renderContent()}
        </div>
    );
}
