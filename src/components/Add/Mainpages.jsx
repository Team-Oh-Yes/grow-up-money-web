import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BigBlocker from "../../BigBlocker";
import MobileBlocker from "../../MobileBlocker";
import { Big, Loginstate, Mobilestate } from "../../atoms";
import Firstmainpages from "../common/maincomponents/Firstmainpages";
import Secondmainpages from "../common/maincomponents/Secondmainpages";
import Thirdmainpages from "../common/maincomponents/Thirdmainpages";
import "../css/mainpagescsss/Mainpages.css";

function Mainpages() {
  const [Login, setLogin] = useRecoilState(Loginstate);
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const navigate = useNavigate();

  // 로그인 상태 변경 시 로그인 페이지로 이동
  useEffect(() => {
    if (Login) {
      navigate("/login");
      setLogin(false); // 상태 초기화
    }
  }, [Login, navigate, setLogin]);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobileBlocked(width < 768);
        setIsExtraLargeScreen(width >= 1920);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileBlocked, setIsExtraLargeScreen]); 
  if (isMobileBlocked) {
    return <MobileBlocker />;
  }
  if (isExtraLargeScreen) {
    return <BigBlocker />;
  }

  // 나머지 정상적으로
  return (
    <div>
      <Firstmainpages setLogin={setLogin} />
      <Secondmainpages />
      <Thirdmainpages />
    </div>
  );
}

export default Mainpages;
