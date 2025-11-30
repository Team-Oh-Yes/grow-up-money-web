import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Show } from "../../../atoms";
import * as data from "../../data/loadmap/loadmapdata";
function Story() {
  const { i, d } = useParams(); // i = "theme1", d = "unit2" 와 같은 값 가정
  const original_string = i; // "theme1"
  const result1 = original_string.replace("theme", ""); // "1"만 남음
  const original = d; // "unit2"
  const result2 = original.replace("unit", ""); // "2"만 남음
  const datakey = `Theme${result1}${result2}`; // 예: "Theme12"
  console.log(datakey);
  const currentTheme = data[datakey];

  const [sshow, setSshow] = useRecoilState(Show);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = currentTheme?.story?.length || 0;

  useEffect(() => {
    if (totalPages === 0) {
      setSshow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, setSshow]);

  if (!currentTheme) {
    return <div className="story">데이터를 찾을 수 없습니다: {datakey}</div>;
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === totalPages - 1) {
      setSshow(false);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="story">
      <div className="story-container">
        <button className="skip" onClick={() => setSshow(false)}>
          스킵하기
        </button>
        <div className="page-number">
          {currentPage + 1} / {totalPages}
        </div>

        <div className="story-content">
          <h1 className="story-title">{currentTheme.title}</h1>
          <p key={currentPage} className="story-text">
            {currentTheme.story[currentPage]}
          </p>
        </div>

        <div className="navigation">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="nav-button"
          >
            ← 이전
          </button>

          <div className="page-dots">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`dot ${index === currentPage ? "active" : ""}`}
              />
            ))}
          </div>

          <button onClick={nextPage} className="nav-button">
            {currentPage === totalPages - 1 ? "퀴즈" : "다음"} →
          </button>
        </div>
      </div>
    </div>
  );
}
export default Story;
