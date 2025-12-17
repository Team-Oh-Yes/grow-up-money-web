import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Shop/Shop.css";

export default function ShopHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "shops", label: "재화상점" },
    { id: "goods", label: "굿즈 구매" },
    { id: "points", label: "포인트 구매" },
    { id: "random", label: "행운 뽑기" },
  ];

  return (
    <div className="S-container">
      <div className="S-button">
        {tabs.map((tab) => {
          const pathSegments = location.pathname.split("/");
          const lastSegment = pathSegments[pathSegments.length - 1];

          // ✨ 핵심 로직:
          // 1. 전체 경로가 정확히 "/shop" 이면 무조건 isActive는 false (하이라이트 없음)
          // 2. "/shop/xxx" 처럼 하위 경로가 있을 때만 해당 id와 비교
          const isActive =
            location.pathname !== "/shop" && lastSegment === tab.id;

          return (
            <div
              key={tab.id}
              className={`clickbutton ${isActive ? "active" : ""}`}
              onClick={() => navigate(`/shop/${tab.id}`)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
