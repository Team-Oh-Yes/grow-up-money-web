import { useState } from "react";
import coin from "../../../img/coin.png";
import m from "../../../img/image 11.svg";
import "../../css/Market/Market.css";

function Market() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sell, setSell] = useState(false);

  const sample = [
    {
      id: 1,
      name: "똥전",
      img: coin,
    },
    { id: 2, name: "??", img: m },
  ];

  const trademain = (item) => {
    setShow(true);
    setSelectedItem(item);
  };

  return (
    <>
      {sell === false ? (
        <Buy
          sample={sample}
          trademain={trademain}
          setSell={setSell}
          sell={sell}
        />
      ) : (
        <Sell setSell={setSell} sell={sell} />
      )}
      {show === true ? <Trade item={selectedItem} setShow={setShow} /> : null}
    </>
  );
}

function Trade({ item, setShow }) {
  return (
    <div className="trade-content" onClick={() => setShow(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>구입하기</h2>
        <img src={item.img} alt={item.name} className="trade-img" />
        <h3>{item.name}</h3>
        <div className="trade-info">
          <p>6일후 마감</p>
          <p>+3% 200p</p>
        </div>
        <div className="trade-buttons">
          <button className="bid-btn">구입하기</button>
          <button className="cancel-btn" onClick={() => setShow(false)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

function Buy({ sample, trademain, setSell, sell }) {
  return (
    <div className="Mcon">
      <div className="mtitle">
        거래소
        <div className="sell">
          <button className="sbt" onClick={() => setSell(!sell)}>
            판매하기
          </button>
        </div>
      </div>
      <div className="market">
        {sample.map((item) => {
          return (
            <div
              key={item.id}
              className="tradecon"
              onClick={() => trademain(item)}
            >
              <div className="pro">
                <img src={item.img} className="mimg" alt={item.name} />
                <div>{item.name}</div>
              </div>
              <div className="sub">
                <p>6일후 마감</p>
                <p>+3% 200p</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sell({ setSell, sell }) {
  return (
    <div className="Mcon">
      <div className="mtitle">
        판매하기
        <div className="sell">
          <button className="sbt" onClick={() => setSell(!sell)}>
            구매하기
          </button>
        </div>
      </div>
      <div>팔 NFT를 선택하세요</div>
    </div>
  );
}

export default Market;
