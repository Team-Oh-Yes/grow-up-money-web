import "../../css/mainpagescsss/Secondmainpages.css";
import arrow from "../../../img/Icon/r-arrow.svg";

// 개별 뉴스 카드 컴포넌트
const NewsCard = ({ update, date, title, description, isSpecial }) => {
  return (
    <div className="news-card">
      <div className={`card-image ${isSpecial}`}></div>
      <div className="card-text-box">
        <p className="card-info">
          {update} <span className="date"> . {date}</span>
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
      update: "시스템 업데이트",
      date: "2025.12.19",
      title: "TossPayment X Grow Money",
      description: "TossPayment를 이용하여 해외결제를 포함한 30여개의 카드사 결제가 가능합니다.",
      isSpecial: "news-card-1",
    },
    {
      update: "정책 업데이트",
      date: "2025.12.17",
      title: "플랜 정책 업데이트",
      description: "사용자 편의를 위해 플랜 가격이 조정되었습니다.",
      isSpecial: "news-card-2",
    },
    {
      update: "시스템 업데이트",
      date: "2025.11.20",
      title: "Pay로 결제하자~!",
      description: "Pay 결제 수단이 추가되었습니다.",
      isSpecial: "news-card-3",
    },
    {
      update: "시스템 업데이트",
      date: "2025.09.23",
      title: "Grow Money 정식출시",
      description: "Grow Money가 정식출시 되었습니다.",
      isSpecial: "news-card-4",
    },
    {
      update: "공지 사항",
      date: "2025.09.22",
      title: "베타테스터를 모집합니다!",
      description: "더 나은 Grow Money를 만들기 위해 베타테스터를 모집합니다.",
      isSpecial: "news-card-5",
    },
    {
      update: "시스템 업데이트",
      date: "2025.09.21",
      title: "첫 번째 업데이트",
      description: "오늘 Grow Money 0.5V 버전이 출시되었습니다.",
      isSpecial: "news-card-6",
    },
  ];

  const openNoticeInNewTab = () => {
    const newWindow = window.open("/servicecenter/notice", "_blank");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <section className="latest-news">
      <div className="latest-news-header">
        <h2 className="header-title">최신 소식</h2>
        <button className="header-arrow">
          <img src={arrow} onClick={openNoticeInNewTab}></img>
        </button>
      </div>
      <div className="card-list">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            update={news.update}
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
