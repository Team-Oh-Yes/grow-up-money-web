import "../../css/mainpagescsss/Secondmainpages.css";
import arrow from "../../../img/newcontentarrow.png";

// 개별 뉴스 카드 컴포넌트
const NewsCard = ({ date, title, description, isSpecial }) => {
  const openNoticeInNewTab = () => {
    const newWindow = window.open("/servicecenter/notice", "_blank");
    if (newWindow) newWindow.opener = null;
  };

  return (
    // button 사용, 기존 클래스 유지. CSS 훼손 방지를 위해 기본 스타일 제거
    <button
      type="button"
      className="news-card"
      onClick={openNoticeInNewTab}
      aria-label={`${title} 공지사항을 새창으로 열기`}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        textDecoration: "none",
        color: "inherit",
        display: "block",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <div className={`card-image ${isSpecial ? "highlighted" : ""}`}></div>
      <div className="card-text-box">
        <p className="card-info">
          시스템 업데이트 <span className="date"> . {date}</span>
        </p>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </button>
  );
};
const Secondmainpages = () => {
  const newsData = [
    {
      date: "2025.12.19",
      title: "TossPayment X Grow Money",
      description: "Pay를 포함한 다양한 결제 수단이 추가되었습니다.",
      isSpecial: true, // 특별한 카드를 표시하기 위한 값
    },
    {
      date: "2025.12.17",
      title: "플랜 정책 업데이트",
      description: "사용자 편의를 위해 플랜 가격이 조정되었습니다.",
      isSpecial: false,
    },
    {
      date: "2025.11.20",
      title: "12월 25일 서비스 점검 안내",
      description: "서비스 안정화를 위한 점검이 예정되어 있습니다.",
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
