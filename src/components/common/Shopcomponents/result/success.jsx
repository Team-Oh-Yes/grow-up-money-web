import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("결제가 성공했습니다! 🎉");

    navigate("/shop", { replace: true });
  }, []);

  return null;
};

export default Success;
