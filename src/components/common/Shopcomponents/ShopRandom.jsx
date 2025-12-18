import { useState } from "react";
import random from "../../../img/random/뽑기통.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/ShopComponents/Random.css";

function ShopRandom() {
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // 흔들림 상태 추가

  const handleDraw = async (count) => {
    if (loading) return;

    setLoading(true);
    setIsShaking(true); // 흔들기 시작

    // 1초 뒤에 흔들기 멈춤
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);

    const endpoint = count === 1 ? "/gacha/draw/one" : "/gacha/draw/five";

    try {
      const res = await axiosInstance.post(endpoint);
      // 애니메이션이 최소 1초는 보여야 하므로 결과는 애니메이션 종료 시점에 맞춰 보여주는 것이 자연스럽습니다.
      setTimeout(() => {
        setResults(res.data.results);
        setShowResult(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("뽑기에 실패했습니다.");
      setLoading(false);
      setIsShaking(false);
    }
  };

  return (
    <div className="shopcon">
      <div className="button-group">
        {/* isShaking이 true일 때만 vibrate 클래스 적용 */}
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
        <div className="result-overlay" onClick={() => setShowResult(false)}>
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
                      <div className="point-box">💰</div>
                      <p>{item.rewardValue}p</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button className="close-bt" onClick={() => setShowResult(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopRandom;