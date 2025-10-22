import { useEffect } from "react";
import { useRecoilState } from "recoil";
import BigBlocker from "../../BigBlocker";
import MobileBlocker from "../../MobileBlocker";
import { Big, Loginstate, Mobilestate } from "../../atoms";
import Loginpages from "../common/Logincomponents/Loginpages";
import Firstmainpages from "../common/maincomponents/Firstmainpages";
import Secondmainpages from "../common/maincomponents/Secondmainpages";
import Thirdmainpages from "../common/maincomponents/Thirdmainpages";
import "../css/mainpagescsss/Mainpages.css";

function Mainpages() {
  const [Login, setLogin] = useRecoilState(Loginstate);
  const [isMobileBlocked, setIsMobileBlocked] = useRecoilState(Mobilestate);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useRecoilState(Big);
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
      {Login ? <Loginpages setLogin={setLogin} /> : null}
    </div>
  );
}

export default Mainpages;
