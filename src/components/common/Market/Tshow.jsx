import { useNavigate } from "react-router-dom";
function Tshow() {
  let navigate = useNavigate();
  return (
    <div>
      <div>거래내역임</div>
      <button onClick={()=>navigate("/market")}>돌아가기</button>
    </div>
  );
}
export default Tshow;
