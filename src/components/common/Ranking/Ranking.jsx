import "../../css/Ranking/Ranking.css";

export default function Ranking() {
  // 더미 데이터 (이미지 UI 기준) - 스크롤을 위해 데이터 확장
  const rankData = [
    { id: 1, rank: 1, name: "세트덩어리", score: 69740 },
    { id: 2, rank: 2, name: "그로우", score: 40000 },
    { id: 3, rank: 3, name: "그로우아ㅏㅏㅏㅏㅏㅏㅏㅏㅏ...", score: 30000 },
    { id: 4, rank: 4, name: "나ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ...", score: 20000 },
    { id: 5, rank: 5, name: "나5등임", score: 10000 },
    { id: 6, rank: 6, name: "나6등○○○", score: 9000 },
    { id: 7, rank: 7, name: "난7등○", score: 8000 },
    { id: 8, rank: 8, name: "나는8등", score: 7000 },
    { id: 9, rank: 9, name: "00000000", score: 6000 },
    { id: 10, rank: 10, name: "열등생", score: 5500 },
    { id: 11, rank: 11, name: "김철수", score: 5200 },
    { id: 12, rank: 12, name: "이영희", score: 5000 },
    { id: 13, rank: 13, name: "박민수", score: 4800 },
    { id: 14, rank: 14, name: "최지훈", score: 4600 },
    { id: 15, rank: 15, name: "정수아", score: 4400 },
    { id: 16, rank: 16, name: "강민지", score: 4200 },
    { id: 17, rank: 17, name: "윤서준", score: 4000 },
    { id: 18, rank: 18, name: "임하은", score: 3800 },
    { id: 19, rank: 19, name: "조예진", score: 3600 },
    { id: 20, rank: 20, name: "신동현", score: 3400 },
    { id: 21, rank: 21, name: "한지우", score: 3200 },
    { id: 22, rank: 22, name: "오수빈", score: 3000 },
    { id: 23, rank: 23, name: "배준호", score: 2800 },
    { id: 24, rank: 24, name: "서윤아", score: 2600 },
    { id: 25, rank: 25, name: "남궁민", score: 2400 },
    { id: 26, rank: 26, name: "황보경", score: 2200 },
    { id: 27, rank: 27, name: "독고진", score: 2000 },
    { id: 28, rank: 28, name: "선우희", score: 1800 },
    { id: 29, rank: 29, name: "제갈량", score: 1600 },
    { id: 30, rank: 30, name: "사마의", score: 1400 },
  ];

  return (
    <div className="ranking-container">
      <div className="ranking-list">
        {rankData.map((user) => (
          <div
            key={user.id}
            className={`rank-item ${user.rank <= 3 ? "rank-top" : ""}`}
          >
            <div className="rank-number">{user.rank}</div>

            <div className="rank-name">{user.name}</div>

            <div className="rank-score">
              {user.score.toLocaleString()} 포인트
            </div>

            <div
              className={`rank-avatar ${user.rank === 1 ? "avatar-first" : ""}`}
            >
              {user.rank === 1 ? "🍰" : "🌱"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
