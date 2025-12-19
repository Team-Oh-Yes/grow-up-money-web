import "../../css/mainpagescsss/Fourth.css"
import { useNavigate } from "react-router-dom";
function Fourth() {
    let navigate = useNavigate()
  return (
    <div className="precon">
      <button className="prebt" onClick={()=>navigate('/pre')}>로드맵 체험하기</button>
    </div>
  );
}
export default Fourth
