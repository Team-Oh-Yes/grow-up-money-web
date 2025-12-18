import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("결제가 실패하거나 취소되었습니다.");

    navigate("/shop", { replace: true });
  }, []);

  return null;
};

export default PaymentFail;
