import { useEffect, useState } from "react";
import pointsIcon from "../../../img/Icon/bouncepoint.svg";
import diaIcon from "../../../img/Icon/diamond.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/ShopComponents/ShopPoints.css";

const ShopPoints = () => {
  const [inputPoints, setInputPoints] = useState(500);
  const [selectedId, setSelectedId] = useState(1);
  const [diamondCost, setDiamondCost] = useState(2500);

  const packages = [
    { id: 1, points: 500, price: 10000 },
    { id: 2, points: 1000, price: 10000 },
    { id: 3, points: 2500, price: 10000 },
    { id: 4, points: 5000, price: 10000 },
    { id: 5, points: 10000, price: 10000 },
  ];

  useEffect(() => {
    const num = parseInt(inputPoints) || 0;
    setDiamondCost(num * 5);
  }, [inputPoints]);

  const handlePackageClick = (pkg) => {
    setSelectedId(pkg.id);
    setInputPoints(pkg.points);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setInputPoints(val);
    setSelectedId(null);
  };

  const handleExchange = async () => {
    const finalPoints = parseInt(inputPoints);
    if (!finalPoints || finalPoints <= 0) return alert("수량을 입력해주세요.");
    try {
      await axiosInstance.post("/exchange/points", {
        points: finalPoints,
        cost: diamondCost,
      });
      alert("환전이 완료되었습니다!");
      window.dispatchEvent(new Event("refreshUserData"));
    } catch (error) {
      alert("다이아몬드가 부족합니다.");
    }
  };

  return (
    <div className="shop-points-container">
      {/* 상단 섹션 */}
      <div className="shop-header-area">
        <div className="shop-header-title-row">
          <h1 className="shop-title">포인트 환전</h1>
        </div>

        <div className="shop-flex-layout">
          {/* 왼쪽: 입력창 구역 */}
          <div className="input-field-group">
            <img src={pointsIcon} className="point-main-logo" alt="pts" />
            <div className="orange-input-box">
              <input
                type="text"
                value={inputPoints}
                onChange={handleInputChange}
                className="input-text-large"
                placeholder="0"
              />
            </div>
          </div>

          {/* 오른쪽: 결제 및 요약 구역 */}
          <div className="payment-summary-group">
            <div className="summary-info-text">
              구매 포인트 : <img src={pointsIcon} className="icon-xs" alt="p" />
              <strong>{Number(inputPoints).toLocaleString()}</strong>
            </div>
            <button className="confirm-pay-btn" onClick={handleExchange}>
              <img src={diaIcon} className="icon-btn-sm" alt="d" />
              <span className="cost-text">{diamondCost.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 그리드 영역 */}
      <div className="shop-grid-area">
        <div className="points-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`pts-card ${selectedId === pkg.id ? "is-active" : ""}`}
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
                  💰 {pkg.price.toLocaleString()}원
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
