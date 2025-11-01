import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/loadmapcss/learn.css"
import { useRecoilState } from "recoil";
import { Show } from "../../../atoms";

import Story from "./Story";

function Learn() {
  const [sshow, setSshow] = useRecoilState(Show);
  useEffect(() => {
    setSshow(true);
  }, [setSshow]);

  return (
    <div className="loadmap-container">{sshow ? <Story /> : <Quiz />}</div>
  );
}
export default Learn;

function Quiz() {
  return <div className="quiz">여기는 퀴즈 컴포넌트입니다.</div>;
}





