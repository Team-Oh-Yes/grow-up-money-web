import { useEffect, useState } from "react";
import rankone from "../../../img/NFT/rankone.svg";
import ranktwo from "../../../img/NFT/ranktwo.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Ranking/Ranking.css";

export default function Ranking() {
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axiosInstance.get("/rank");
        if (Array.isArray(response.data)) {
          setRankData(response.data);
        }
      } catch (e) {
        console.error("데이터 로딩 실패:", e);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      <img src={rankone} className="rone" alt="decoration" />

      <div className="ranking-board">
        <h1 className="rtitle">랭킹</h1>
        <div className="ranking-scroll-area">
          {rankData.map((user) => (
            <div
              key={user.userId}
              className={`rank-item ${
                user.rank === 1 ? "rank-item-1" : 
                user.rank === 2 ? "rank-item-2" : 
                user.rank === 3 ? "rank-item-3" : ""
              }`}
            >
              <div className="rank-number">{user.rank}</div>
              
              <div className="rank-name">
                {user.displayName || `익명유저(${user.userId})`}
              </div>

              <div className="rank-score">
                {user.totalEarnedPoints?.toLocaleString() || 0} 포인트
              </div>

              {/* 이미지 컨테이너: CSS에서 40px 고정 */}
              <div className={`rank-avatar-container ${user.rank === 1 ? "avatar-first" : ""}`}>
                {user.profileUrl ? (
                  <img 
                    src={user.profileUrl} 
                    alt="profile" 
                    className="rank-profile-img"
                  />
                ) : (
                  <span className="default-emoji">
                    {user.rank === 1 ? "🍰" : "🌱"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <img src={ranktwo} className="rtwo" alt="decoration" />
    </div>
  );
}