import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ma from "../../../img/image 11.svg";
import arrow from "../../../img/오른쪽.png";
import "../../css/loadmapcss/learn.css";
import { Ldata } from "../../data/loadmap/learndata";
function Learn() {
  const [story, setStory] = useState(0);
  const [showChose, setShowChose] = useState(false);
  const { i, d } = useParams();
  const navigate = useNavigate();
  const original_string = d || "";
  const unitFreeString = original_string.replace("unit", "");
  const index = parseInt(unitFreeString, 10) - 1;
  const currentUnit = Ldata[index];
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
    navigate(`/roadmap/${i}/unit${parseInt(unitFreeString)}/quiz`);
  };

  const handleStop = () => {
    navigate("/roadmap");
  };

  return (
    <div className="lcon">
      {showChose ? (
        <div className="Ccon">
          <div className="realcon">
            <div>
              <img src={ma} className="m" alt="character" />
            </div>
            <div className="cbox">
              <button className="go" onClick={handleContinue}>
                퀴즈 풀러가기
              </button>
              <button className="stop" onClick={handleStop}>
                학습 그만하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="lsubcon">
            <div className="imgcon">
              <img
                src={`${currentUnit.text[story].img}`}
                className="random"
              ></img>
            </div>
            <button className="stext" onClick={next}>
              <img src={currentUnit.text[story].img} className="maskort"></img>
              <div className="textcom">{currentUnit.text[story].real}</div>
            </button>
          </div>
          <button onClick={next} className="next">
            <img src={arrow}></img>
          </button>
        </>
      )}
    </div>
  );
}

export default Learn;
