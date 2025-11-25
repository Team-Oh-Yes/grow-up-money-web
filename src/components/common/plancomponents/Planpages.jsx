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
    <div className="planpages-container">
      <header className="plan-header">
        <h1>플랜 선택</h1>
        <p>Grow Money의 모든 기능을 이용하려면 프리미엄 플랜으로 업그레이드하세요!</p>
      </header>

      <main className="plan-main">
        <section className="plan-monthly">
          <h2>월간 프리미엄 플랜</h2>
          <p className="plan-price">₩8,900 / 월</p>
          <ul className="plan-features">
            <li>광고 제거</li>
            <li>FT 고화질 다운로드</li>
            <li>프리미엄용 프로필 꾸미기 가능</li>
            <li>프로필 닉네임 그라데이션</li>
            <li>포인트 충전 + 10%</li>
            <li>심화 문제 (포인트 10배)</li>
          </ul>
          <button className="plan-select-button" onClick={handlePaymentcurrentPlan}>
            이 플랜 선택
          </button>
        </section>

        <section className="plan-everlasting">
          <h2>영구 프리미엄 플랜</h2>
          <p className="plan-price">₩29,000 (일회성 결제)</p>
          <ul className="plan-features">
            <li>월간 프리미엄의 모든 기능</li>
            <li>영구 구독</li>
          </ul>
          <button className="plan-select-button" onClick={handlePaymentcurrentPlanPremium}>
            이 플랜 선택
          </button>
        </section>
      </main>
    </div>
  );
}

export default Planpages;
