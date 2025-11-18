import { useState } from "react";
import right from "../../../img/오른쪽.png";
import left from "../../../img/arrowleft2.png";
import "../../css/mainpagescsss/Thirdmainpages.css";
function ThirdMainPages() {
  // 현재 보여줄 이미지 번호 (0부터 시작)
  const [currentImage, setCurrentImage] = useState(2);

  // 이미지 목록
  const imageList = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400",
    "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=400",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400",
  ];

  // 다음 이미지 보기
  function showNextImage() {
    if (currentImage === 4) {
      setCurrentImage(0); // 마지막이면 첫번째로
    } else {
      setCurrentImage(currentImage + 1); // 다음 이미지로
    }
  }

  // 이전 이미지 보기
  function showPrevImage() {
    if (currentImage === 0) {
      setCurrentImage(4); // 첫번째면 마지막으로
    } else {
      setCurrentImage(currentImage - 1); // 이전 이미지로
    }
  }

  return (
    <div className="Thirdmainpageback">
      <h1 className="title">먼저보기</h1>
      {/* 이미지 슬라이더 */}
      <div className="slider">
        {/* 이전 버튼 */}
        <button className="button" onClick={showPrevImage}>
          <img src={left}></img>
        </button>
        {/* 이미지들 */}
        <div className="image-container">
          {imageList.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              className={index === currentImage ? "image active" : "image"}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        {/* 다음 버튼 */}
        <button className="button" onClick={showNextImage}>
          <img src={right}></img>
        </button>
      </div>

      {/* 동그라미 버튼들 */}
      <div className="dots">
        {imageList.map((_, index) => (
          <button
            key={index}
            className={index === currentImage ? "dot active" : "dot"}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      {/* 하단 검은색 영역 */}
      <div className="footer">
        <h2 className="ftitlem">GROW UP MONEY</h2>
        <hr></hr>
        <p className="D">
          <a href="/servicecenter/eula" target="_blank" rel="noopener noreferrer">이용약관</a> |
          <a href="/no-terms" target="_blank" rel="noopener noreferrer"> 무이용약관</a> |
          <a href="/privacy" target="_blank" rel="noopener noreferrer"> 개인정보처리방침</a> |
          <a href="/policy" target="_blank" rel="noopener noreferrer"> 책임준수정책</a>
        </p>
        <p className="ftitle">대구광역시 달성군 구지면 창리로11길 93</p>
        <p className="ftitle">© Oh!Yes | 전화번호: 010-1234-5678 | 이메일: me@ohyes.com</p>
      </div>
    </div>
  );
}

export default ThirdMainPages;
