import { memo } from "react"; // 잊지 말고 import 해야 합니다.
import arrow from "../../../img/arrowleft.png";
function Tamatitle(props) {
  return (
    <div className="tamatitle">
      <img src={arrow} alt="화살표"></img>
      <p className="tamap">
        {`테마${props.n} ${props.m ? `, 단원${props.m}` : ""}`}
      </p>
    </div>
  );
}
export default memo(Tamatitle);
