import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import pointsIcon from "../../../img/Icon/bouncepoint.svg";
import axiosInstance from "../../api/axiosInstance";
import dia from "../../../img/logo/diam.svg";
import "../../css/ShopComponents/ShopPoints.css";

const ShopPoints = () => {
  const [inputPoints, setInputPoints] = useState(500);
  const [selectedId, setSelectedId] = useState(1);
  const [diamondCost, setDiamondCost] = useState(2500);

  const packages = [
    { id: 1, points: 500, price: 1000 },
    { id: 2, points: 1000, price: 2000 },
    { id: 3, points: 2500, price: 3000 },
    { id: 4, points: 5000, price: 4000 },
    { id: 5, points: 10000, price: 5000 },
  ];

  useEffect(() => {
    const num = parseInt(inputPoints) || 0;
    setDiamondCost(num * 5); // 포인트당 5다이아 가정
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
    if (!finalPoints || finalPoints <= 0) {
      toast.info("수량을 입력해주세요.");
      toast.clearWaitingQueue();
      return;
    }

    try {
      // 사용자가 요청한 {"amount": 수량} 형식 적용
      await axiosInstance.post("/shop/points/exchange", {
        amount: finalPoints,
      });
      toast.success("포인트 환전 성공!");
      toast.clearWaitingQueue();
      
      window.dispatchEvent(new Event("refreshUserData"));
    } catch (error) {
      toast.info(error.response?.data?.message || "다이아몬드가 부족합니다.");
      toast.clearWaitingQueue();
    }
  };

  return (
    <div className="shop-points-container">
      <div className="shop-header-area">
        <div className="shop-header-title-row">
          <h1 className="shop-title">포인트 환전</h1>
        </div>

        <div className="shop-flex-layout">
          <div className="input-field-group">
            <img src={dia} className="point-main-logo" alt="pts" />
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

          <div className="payment-summary-group">
            <div className="summary-info-text">
              구매 포인트 : <img src={dia} className="icon-xs" alt="p" />
              <strong>{Number(inputPoints || 0).toLocaleString()}</strong>
            </div>
            <button className="confirm-pay-btn" onClick={handleExchange}>
              <img src={pointsIcon} className="icon-btn-sm" alt="d" />
              <span className="cost-text">{diamondCost.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="shop-grid-area">
        <div className="points-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`pts-card ${selectedId === pkg.id ? "is-active" : ""}`}
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="card-top-img">
                <img src={dia} alt="pts" />
              </div>
              <div className="card-bottom-info">
                <p className="pts-label">
                  {pkg.points.toLocaleString()} 포인트
                </p>
                <div className="pts-price-tag">
                  {pkg.price.toLocaleString()}원
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