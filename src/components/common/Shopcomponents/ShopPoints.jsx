import { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import pointsIcon from "../../../img/Icon/bouncepoint.svg";
import diaIcon from "../../../img/Icon/diamond.svg";
import "../../css/ShopComponents/ShopPoints.css";

const TOSS_CLIENT_KEY = "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";

const ShopPoints = () => {
  const [selectedId, setSelectedId] = useState(null);

  const packages = [
    { id: 1, points: 500, price: 10000, orderName: "500 포인트" },
    { id: 2, points: 1000, price: 18000, orderName: "1000 포인트" },
    { id: 3, points: 2500, price: 40000, orderName: "2500 포인트" },
    { id: 4, points: 5000, price: 75000, orderName: "5000 포인트" },
  ];

  const selectedPkg = packages.find(p => p.id === selectedId);

  const handlePackageClick = (pkg) => {
    setSelectedId(pkg.id);
  };

  const handleTossPay = async () => {
    if (!selectedPkg) {
      alert("포인트 패키지를 선택해주세요!");
      return;
    }

    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

    await tossPayments.requestPayment("카드", {
      amount: selectedPkg.price,
      orderId: `order_${Date.now()}`,
      orderName: selectedPkg.orderName,
      customerName: "테스트유저",
      successUrl: `${window.location.origin}/shop/result/success`,
      failUrl: `${window.location.origin}/shop/result/fail`,
    });
  };

  return (
    <div className="shop-points-container">
      {/* 상단 */}
      <div className="shop-header-area">
        <h1 className="shop-title">포인트 구매</h1>

        <div className="shop-flex-layout">
          <div className="input-field-group">
            <img src={pointsIcon} className="point-main-logo" alt="pts" />
            <div className="orange-input-box">
              <div className="input-text-large">
                {selectedPkg
                  ? selectedPkg.points.toLocaleString()
                  : "선택"}
              </div>
            </div>
          </div>

          <div className="payment-summary-group">
            <div className="summary-info-text">
              구매 포인트 :
              <img src={pointsIcon} className="icon-xs" alt="p" />
              <strong>
                {selectedPkg
                  ? selectedPkg.points.toLocaleString()
                  : 0}
              </strong>
            </div>

            <button className="confirm-pay-btn" onClick={handleTossPay}>
              <img src={diaIcon} className="icon-btn-sm" alt="d" />
              <span className="cost-text">
                {selectedPkg
                  ? selectedPkg.price.toLocaleString()
                  : 0}
                원 결제
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 패키지 목록 */}
      <div className="shop-grid-area">
        <div className="points-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`pts-card ${
                selectedId === pkg.id ? "is-active" : ""
              }`}
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="card-top-img">
                <img src={pointsIcon} alt="pts" />
              </div>
              <div className="card-bottom-info">
                <p className="pts-label">
                  {pkg.points.toLocaleString()} 포인트
                </p>
                <div className="pts-price-tag">
                  💳 {pkg.price.toLocaleString()}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPoints;