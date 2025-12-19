import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ma from "../../../img/NFT/ranktwo.svg";
import arrow from "../../../img/오른쪽.png";
// import coin from "../../../img/coin.svg"; // coin 이미지가 없으면 ma를 사용

// CSS import를 try-catch로 감쌀 수 없으므로 주석 처리하고 테스트
// import "../../css/loadmapcss/learn.css";
// import '../../css/MypageProfile/MypageInfoContent.css';

// 체험용 데이터 (임시로 ma 이미지 사용)
const PRE_VIEW_DATA = [
  {
    id: 1,
    title: "재화와 서비스",
    text: [
      { id: 1, real: "안녕하세요! 여러분에게 재화와 서비스에 대해 알려줄 '똥전'이라고 해요!", img: ma },
      { id: 2, real: "이번 단원에서 경제 활동, 재화, 서비스의 개념을 같이 배워봐요!", img: ma },
      { id: 3, real: "준하가 가게에서 사탕을 샀습니다. 형태가 있는 사탕은 '재화'에요!", img: ma },
      { id: 4, real: "미용실에서 머리를 자르는 것은 형태는 없지만 가치를 주는 '서비스'에요!", img: ma },
      { id: 5, real: "누구나 마음껏 마실 수 있는 공기나 바람은 '자유재'라고 불러요.", img: ma },
      { id: 6, real: "반대로 돈을 지불해야 얻을 수 있는 떡볶이는 '경제재'랍니다!", img: ma },
      { id: 7, real: "학습이 완료되었습니다! 퀴즈를 풀러 가볼까요?", img: ma },
    ],
  },
];

function PreviewLearn() {
  const [story, setStory] = useState(0);
  const [showChose, setShowChose] = useState(false);
  const navigate = useNavigate();

  // 체험용 데이터 사용 (첫 번째 유닛)
  const currentUnit = PRE_VIEW_DATA[0];
  const storyLength = currentUnit.text.length;
  const isLastStory = story === storyLength - 1;

  const next = () => {
    if (isLastStory) {
      setShowChose(true);
    } else {
      setStory(story + 1);
    }
  };

  const handleContinue = () => {
    // 체험 모드이므로 체험 퀴즈 페이지로 이동
    navigate("/preq");
  };

  const handleStop = () => {
    // 메인 페이지나 로드맵으로 이동
    navigate("/");
  };

  return (
    <div className="lcon" style={{ width: '100%', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <p style={{ textAlign: 'center' }}>Story: {story + 1} / {storyLength}</p>
      
      {showChose ? (
        // 퀴즈/종료 선택 화면
        <div className='profile-Info-password-modal-overlay'>
          <div className='profile-Info-password-modal' onClick={(e) => e.stopPropagation()}>
            <div className='profile-Info-logout-modal-title'>퀴즈 학습으로 넘어갈까요?</div>

            <div className='profile-Info-logout-modal-content'>
              <img className='profile-Info-logout-img' src={ma} alt="character" />
            </div>
            
            <div className='profile-Info-logout-modal-buttons'>
              <button 
                className='profile-Info-logout-modal-cancel'
                onClick={handleContinue}
              >
                퀴즈 풀러가기
              </button>
              <button 
                className='profile-Info-logout-modal-submit'
                onClick={handleStop}
              >
                학습 그만하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 스토리 진행 화면
        <>
          <div className="lsubcon">
            <div className="imgcon">
              <img
                src={currentUnit.text[story].img}
                className="randomN"
                alt="학습 이미지"
              />
            </div>
            <button className="stext" onClick={next}>
              <img
                src={currentUnit.text[story].img}
                className="maskort"
                alt="마스크 이미지"
              />
              <div className="textcom">{currentUnit.text[story].real}</div>
            </button>
          </div>
          <button onClick={next} className="next">
            <img src={arrow} alt="다음으로" />
          </button>
        </>
      )}
    </div>
  );
}

export default PreviewLearn;