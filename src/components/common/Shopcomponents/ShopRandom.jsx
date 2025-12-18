import random from "../../../img/random/뽑기통.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Shop/Random.css";

function ShopRandom() {
  // 1회 뽑기
  const handleDrawOne = async () => {
    try {
      const res = await axiosInstance.post("/gacha/draw/one");
      console.log("1회 뽑기 결과:", res.data);
      alert("뽑기 성공!");
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 5회 뽑기
  const handleDrawFive = async () => {
    try {
      const res = await axiosInstance.post("/gacha/draw/five");
      console.log("5회 뽑기 결과:", res.data);
      alert("5연속 뽑기 완료!");
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="shopcon">
      <div className="button-group">
        <img src={random} className="random"></img>
        <div>
          <div className="bt">
            <button className="gacha-button btn-one" onClick={handleDrawOne}>
              1회 뽑기
            </button>
            <button className="gacha-button btn-five" onClick={handleDrawFive}>
              5회 연속 뽑기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopRandom;
