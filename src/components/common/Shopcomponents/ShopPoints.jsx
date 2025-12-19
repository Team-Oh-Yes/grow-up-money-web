import { loadTossPayments } from "@tosspayments/payment-sdk"; // SDK 임포트
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import pointsIcon from "../../../img/Icon/bouncepoint.svg";
import dia from "../../../img/logo/diam.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/ShopComponents/ShopPoints.css";

const ShopPoints = () => {
  const [inputPoints, setInputPoints] = useState(500);
  const [selectedPkg, setSelectedPkg] = useState({
    id: 1,
    points: 500,
    price: 1000,
  });
  const [diamondCost, setDiamondCost] = useState(2500);

  // 토스 클라이언트 키 (테스트용)
  const TOSS_CLIENT_KEY = "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";

  const packages = [
    { id: 1, points: 500, price: 1000 },
    { id: 2, points: 1000, price: 2000 },
    { id: 3, points: 2500, price: 3000 },
    { id: 4, points: 5000, price: 4000 },
    { id: 5, points: 10000, price: 5000 },
  ];

  useEffect(() => {
    const num = parseInt(inputPoints) || 0;
    setDiamondCost(num * 5);
  }, [inputPoints]);

  const handlePackageClick = (pkg) => {
    setSelectedPkg(pkg); // 패키지 전체 정보 저장
    setInputPoints(pkg.points);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setInputPoints(val);
    setSelectedPkg(null); // 직접 입력 시 패키지 선택 해제
  };

  // 1. 포인트 환전 (다이아몬드 사용)
  const handleExchange = async () => {
    const finalPoints = parseInt(inputPoints);
    if (!finalPoints || finalPoints <= 0) {
      toast.info("수량을 입력해주세요.");
      toast.clearWaitingQueue();
      return;
    }

    try {
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

  // 2. 토스 결제 실행 (현금 결제)
  const handlePayment = async () => {
    if (!selectedPkg) {
      alert("결제할 패키지를 선택해주세요.");
      return;
    }

    try {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      // 결제창 호출
      await tossPayments.requestPayment("카드", {
        amount: selectedPkg.price,
        orderId: `order_${Math.random().toString(36).slice(2, 11)}`, // 고유 주문번호 생성
        orderName: `${selectedPkg.points} 포인트 충전`,
        successUrl: `${window.location.origin}/shop/success`, // 결제 성공 시 이동할 URL
        failUrl: `${window.location.origin}/shop/fail`, // 결제 실패 시 이동할 URL
      });
    } catch (error) {
      if (error.code === "USER_CANCEL") {
        console.log("사용자가 결제를 취소했습니다.");
      } else {
        alert("결제 준비 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="shop-points-container">
      <div className="shop-header-area">
        <div className="shop-header-title-row">
          <h1 className="shop-title">포인트 충전 및 환전</h1>
        </div>

        <div className="shop-flex-layout">
          {/* 입력 필드 */}
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

          {/* 정보 요약 및 버튼 그룹 */}
          <div className="payment-summary-group">
            <div className="summary-info-text">
              구매 포인트 : <img src={dia} className="icon-xs" alt="p" />
              <strong>{Number(inputPoints || 0).toLocaleString()}</strong>
            </div>

            <div
              className="shop-btn-row"
              style={{ display: "flex", gap: "10px" }}
            >
              {/* 환전 버튼 (기존) */}
              <button
                className="confirm-pay-btn exchange-btn"
                onClick={handleExchange}
              >
                <img src={pointsIcon} className="icon-btn-sm" alt="d" />
                <span className="cost-text">
                  {diamondCost.toLocaleString()} (환전)
                </span>
              </button>

              {/* 결제 버튼 (새로 추가) */}
              {selectedPkg && (
                <button
                  className="confirm-pay-btn toss-pay-btn"
                  onClick={handlePayment}
                  style={{ backgroundColor: "#0050ff" }}
                >
                  <span className="cost-text">
                    {selectedPkg.price.toLocaleString()}원 결제
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="shop-grid-area">
        <div className="points-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`pts-card ${
                selectedPkg?.id === pkg.id ? "is-active" : ""
              }`}
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
