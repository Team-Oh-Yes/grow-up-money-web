// PaymentCallback.jsx
import { useEffect } from "react";

function PaymentCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("result");

    if (result === "success") {
      alert("결제가 성공적으로 완료되었습니다.");
    } else if (result === "fail") {
      alert("결제가 실패되었습니다.");
    }

    // 완전 새로 이동 (SPA 상태 초기화)
    window.location.replace("/more");
  }, []);

  return null;
}

export default PaymentCallback;
