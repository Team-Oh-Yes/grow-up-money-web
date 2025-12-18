import { useState } from "react";
import { useSetRecoilState } from "recoil";
import random from "../../../img/random/뽑기통.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/ShopComponents/Random.css";
import dia from '../../../img/Icon/randomdia.svg';

function ShopRandom() {
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleDraw = async (count) => {
    if (loading) return;

    setLoading(true);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 1000);

    const endpoint = count === 1 ? "/gacha/draw/one" : "/gacha/draw/five";

    try {
      const res = await axiosInstance.post(endpoint);
      console.log(res.data);

      setTimeout(() => {
        setResults(res.data.results);
        setShowResult(true);
        setLoading(false);
        
        // 결과 표시 후 유저 정보 다시 불러오기
        refreshUserData();
      }, 1000);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("뽑기에 실패했습니다.");
      setLoading(false);
      setIsShaking(false);
    }
  };

  // 유저 데이터 새로고침 함수
  const refreshUserData = async () => {
    try {
      const response = await axiosInstance.get("/me");
      // 여기서 pointBalance를 업데이트하려면 부모 컴포넌트나 전역 상태를 사용해야 합니다
      // 현재는 Loginmaincomponents에서 data를 관리하므로 이벤트를 발생시키거나
      // 전역 상태를 사용하는 방법이 필요합니다
      window.dispatchEvent(new CustomEvent('updateUserData', { detail: response.data }));
    } catch (error) {
      console.error("유저 정보 갱신 에러:", error);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  return (
    <div className="shopcon">
      <div className="button-group">
        <img src={random} className={`random ${isShaking ? "vibrate" : ""}`} alt="뽑기통" />
        <div>
          <div className="bt">
            <button className="gacha-button btn-one" onClick={() => handleDraw(1)} disabled={loading}>
              {loading ? "뽑는 중..." : "1회 뽑기"}
            </button>
            <button className="gacha-button btn-five" onClick={() => handleDraw(5)} disabled={loading}>
              {loading ? "뽑는 중..." : "5회 연속 뽑기"}
            </button>
          </div>
        </div>
      </div>

      {showResult && (
        <div className="result-overlay" onClick={handleCloseResult}>
          <div className="result-modal" onClick={(e) => e.stopPropagation()}>
            <h2>뽑기 결과</h2>
            <div className="result-container">
              {results.map((item, idx) => (
                <div key={idx} className="result-card">
                  {item.rewardType === "NFT" ? (
                    <>
                      <img src={item.nftImageUrl} alt={item.nftName} className="res-img" />
                      <p>{item.nftName}</p>
                    </>
                  ) : (
                    <>
                      <div className="point-box"><img src={dia} alt="다이아" /></div>
                      <p>{item.rewardValue}p</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button className="close-bt" onClick={handleCloseResult}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopRandom;