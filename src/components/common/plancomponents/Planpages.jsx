import "../../css/Planpages/Planpages.css";

function Planpages() {
  const handlePaymentcurrentPlan = () => {
    const clientKey = "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";
    const tossPayments = window.TossPayments(clientKey);

    tossPayments.requestPayment("카드", {
      amount: 8900,
      orderId: "order_" + new Date().getTime(),
      orderName: "Grow Money \nMONTHLY PREMIUM",
      successUrl: "http://localhost:5173/plan",
      failUrl: "http://localhost:5173/plan",
    });
  };

  const handlePaymentcurrentPlanPremium = () => {
    const clientKey = "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";
    const tossPayments = window.TossPayments(clientKey);

    tossPayments.requestPayment("카드", {
      amount: 29000,
      orderId: "order_" + new Date().getTime(),
      orderName: "Grow Money \nEVERLASTING PREMIUM",
      successUrl: "http://localhost:5173/plan",
      failUrl: "http://localhost:5173/plan",
    });
  };

  return (
    <main className="main-content">
      <div className="topBar">
        <div className="Plan">

          <span>플랜 업그레이드</span>
          <div className="plans">
            <div className="Free">
              <span>MONTHLY PREMIUM</span>
              <p className="Dollor">₩</p>
              <p className="price">8900</p>
              <p className="USD">KRW /</p>
              <p className="perMonth">월</p>
              <p className="explanation">Grow Up Money의 월별 유료 제공 플랜</p>

              <button
                onClick={handlePaymentcurrentPlan}
                className="currentPlan"
              >
                <div>플랜 업그레이드</div>
              </button>
              <ul className="features">
                <li>광고 제거</li>
                <li>FT 고화질 다운로드</li>
                <li>프리미엄용 프로필 꾸미기 가능</li>
                <li>프로필 닉네임 그라데이션</li>
                <li>포인트 충전 + 10%</li>
                <li>심화 문제 (포인트 10배)</li>
              </ul>
            </div>

            <div className="Premium">
              <span>EVERLASTING PREMIUM</span>
              <p className="Dollor">₩</p>
              <p className="price">29,000</p>
              <p className="USD">KRW /</p>
              <p className="perMonth">영구</p>
              <p className="explanation">Grow Up Money의 영구 유료 제공 플랜</p>

              <button
                onClick={handlePaymentcurrentPlanPremium}
                className="currentPlanPremium"
              >
                <div>플랜 업그레이드</div>
              </button>
              <ul className="features">
                <li>MONTHLY PREMIUM의 모든 기능</li>
                <li>영구 구독</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Planpages;
