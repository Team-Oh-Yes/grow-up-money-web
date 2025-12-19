import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BigBlocker from "../../BigBlocker";
import MobileBlocker from "../../MobileBlocker";
import { Big, Loginstate, Mobilestate } from "../../atoms";
import Firstmainpages from "../common/maincomponents/Firstmainpages";
import Fourth from "../common/maincomponents/Fourth";
import Secondmainpages from "../common/maincomponents/Secondmainpages";
import Thirdmainpages from "../common/maincomponents/Thirdmainpages";
import "../css/mainpagescsss/Mainpages.css";

function Mainpages() {
  const [Login, setLogin] = useRecoilState(Loginstate);
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
  const navigate = useNavigate();
  useEffect(() => {
    if (Login) {
      navigate("/login");
      setLogin(false);
    }
  }, [Login, navigate, setLogin]);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobileBlocked(width < 768);
        setIsExtraLargeScreen(width >= 3200);
      }
    };
    console.log(isMobileBlocked);
    console.log(isExtraLargeScreen);
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
      <Fourth />
      <Secondmainpages />
      <Thirdmainpages />
    </div>
  );
}

export default Mainpages;
