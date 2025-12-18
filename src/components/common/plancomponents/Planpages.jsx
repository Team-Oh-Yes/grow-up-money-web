import { useCallback, useEffect } from "react";
import "../../css/Planpages/Planpages.css";

// 플랜 데이터
const PLANS = [
  {
    id: "monthly",
    name: "MONTHLY PREMIUM",
    price: 1900,
    priceDisplay: "1900",
    period: "월",
    description: "Grow Up Money의 월별 유료 제공 플랜",
    features: [
      "광고 제거",
      "FT 고화질 다운로드",
      "프리미엄용 프로필 꾸미기 가능",
      "프로필 아이디 그라데이션",
      "포인트 충전 + 10%",
      "심화 문제 (포인트 10배)",
    ],
    className: "Free",
    buttonClassName: "currentPlan",
  },
  {
    id: "everlasting",
    name: "EVERLASTING PREMIUM",
    price: 4900,
    priceDisplay: "4900",
    period: "영구",
    description: "Grow Up Money의 영구 유료 제공 플랜",
    features: ["MONTHLY PREMIUM의 모든 기능", "영구 구독"],
    className: "Premium",
    buttonClassName: "currentPlanPremium",
  },
];

const TOSS_CLIENT_KEY =
  import.meta.env.VITE_TOSS_CLIENT_KEY ||
  "test_ck_Ba5PzR0ArnnN1xXZMoWGrvmYnNeD";

function Planpages() {
  /* =========================
     결제 결과 알람 처리
     ========================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("result");

    if (result === "success") {
      alert("결제가 성공적으로 완료되었습니다.");
      window.history.replaceState({}, "", "/more");
    }

    if (result === "fail") {
      alert("결제가 실패되었습니다.");
      window.history.replaceState({}, "", "/more");
    }
  }, []);

  const handlePayment = useCallback((plan) => {
    const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);

    tossPayments.requestPayment("카드", {
      amount: plan.price,
      orderId: `order_${Date.now()}`,
      orderName: `Grow Money ${plan.name}`,
      successUrl: `${window.location.origin}/plan?result=success`,
      failUrl: `${window.location.origin}/plan?result=fail`,
    });
  }, []);

  return (
    <main className="main-content">
      <div className="topBar">
        <div className="Plan">
          <span>플랜 업그레이드</span>

          <div className="plans">
            {PLANS.map((plan) => (
              <div key={plan.id} className={plan.className}>
                <span>{plan.name}</span>

                <p className="Dollor">₩</p>
                <p className="price">{plan.priceDisplay}</p>
                <p className="USD">KRW /</p>
                <p className="perMonth">{plan.period}</p>
                <p className="explanation">{plan.description}</p>

                <button
                  onClick={() => handlePayment(plan)}
                  className={plan.buttonClassName}
                >
                  <div>플랜 업그레이드</div>
                </button>

                <ul className="features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Planpages;
