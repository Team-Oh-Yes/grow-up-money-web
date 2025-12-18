import "../../css/mainpagescsss/Secondmainpages.css";
import arrow from "../../../img/MainPage/test1.png";

// 개별 뉴스 카드 컴포넌트
const NewsCard = ({ date, title, description, isSpecial }) => {
  return (
    <div className="news-card">
      <div className={`card-image ${isSpecial ? "highlighted" : ""}`}></div>
      <div className="card-text-box">
        <p className="card-info">
          시스템 업데이트 <span className="date"> . {date}</span>
        </p>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};
const Secondmainpages = () => {
  const newsData = [
    {
      date: "2025.09.23",
      title: "디자인 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 디자인 중이라고 합니다!",
      isSpecial: true, // 특별한 카드를 표시하기 위한 값
    },
    {
      date: "2025.09.22",
      title: "프론트엔드 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 웹 중이라고 합니다!",
      isSpecial: false,
    },
    {
      date: "2025.09.21",
      title: "백엔드 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 서버 개발 중이라고 합니다!",
      isSpecial: false,
    },
    {
      date: "2025.09.21",
      title: "백엔드 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 서버 개발 중이라고 합니다!",
      isSpecial: false,
    },
    {
      date: "2025.09.21",
      title: "백엔드 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 서버 개발 중이라고 합니다!",
      isSpecial: false,
    },
    {
      date: "2025.09.21",
      title: "백엔드 본격적 스타트",
      description: "오늘 2025 나르샤 Oh! Yes팀 서버 개발 중이라고 합니다!",
      isSpecial: false,
    },
  ];

  return (
    <section className="latest-news">
      <div className="latest-news-header">
        <h2 className="header-title">최신 소식</h2>
        <button className="header-arrow">
          <img src={arrow}></img>
        </button>
      </div>
      <div className="card-list">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            date={news.date}
            title={news.title}
            description={news.description}
            isSpecial={news.isSpecial}
          />
        ))}
      </div>
    </section>
  );
};

export default Secondmainpages;
