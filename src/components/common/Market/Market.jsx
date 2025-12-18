import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import coin from "../../../img/coin.png";
import m from "../../../img/image 11.svg";
import cat from "../../../img/NFT/cat.svg";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Market/Market.css";
function Market() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sell, setSell] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedNFTForSale, setSelectedNFTForSale] = useState(null);
  const [listings, setListings] = useState([]);
  const [myNFTs, setMyNFTs] = useState([
    {
      id: 101,
      name: "똥전",
      img: coin,
    },
    {
      id: 102,
      name: "???",
      img: m,
    },
    {
      id: 103,
      name: "고양이",
      img: cat,
    },
  ]);

  const connect = async () => {
    const response = await axiosInstance.get("/market/listings");
    console.log(response.date);
  };

  useEffect(() => {
    const isQuizPath = location.pathname.includes("/roadmap");
    connect();
    // 초기 샘플 데이터
    setListings([
      {
        id: 1,
        name: "똥전",
        img: coin,
        price: 200,
      },
      { id: 2, name: "??", img: m, price: 150 },
    ]);
  }, [location.pathname]);

  const trademain = (item) => {
    setShow(true);
    setSelectedItem(item);
  };

  const openPriceModal = (nft) => {
    setSelectedNFTForSale(nft);
    setShowPriceModal(true);
  };

  const handleSellNFT = (nft, price) => {
    // 내 NFT 목록에서 제거
    setMyNFTs(myNFTs.filter((item) => item.id !== nft.id));
    // 거래소에 가격 정보와 함께 추가
    setListings([...listings, { ...nft, price: price }]);
    // 모달 닫기
    setShowPriceModal(false);
    setSelectedNFTForSale(null);
  };

  const handleBuyNFT = (item) => {
    // 거래소에서 제거
    setListings(listings.filter((listing) => listing.id !== item.id));
    // 내 NFT 목록에 추가 (가격 정보 제거)
    const { price, ...nftWithoutPrice } = item;
    setMyNFTs([...myNFTs, nftWithoutPrice]);
    // 모달 닫기
    setShow(false);
  };
  return (
    <>
      {sell === false ? (
        <Buy
          sample={listings}
          trademain={trademain}
          setSell={setSell}
          sell={sell}
        />
      ) : (
        <Sell
          setSell={setSell}
          sell={sell}
          myNFTs={myNFTs}
          openPriceModal={openPriceModal}
        />
      )}
      {show === true ? (
        <Trade
          item={selectedItem}
          setShow={setShow}
          handleBuyNFT={handleBuyNFT}
        />
      ) : null}
      {showPriceModal === true ? (
        <PriceModal
          nft={selectedNFTForSale}
          setShowPriceModal={setShowPriceModal}
          handleSellNFT={handleSellNFT}
        />
      ) : null}
    </>
  );
}

function PriceModal({ nft, setShowPriceModal, handleSellNFT }) {
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    const numPrice = parseInt(price);
    if (numPrice && numPrice > 100) {
      axiosInstance.post("/market/listings", selldata);
    } else {
      alert("올바른 가격을 입력해주세요.");
    }
  };

  return (
    <div className="trade-content" onClick={() => setShowPriceModal(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>판매 가격 설정</h2>
        <img src={nft.img} alt={nft.name} className="trade-img" />
        <h3>{nft.name}</h3>
        <div className="price-input-container">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력하세요"
            className="price-input"
            min="1"
          />
        </div>
        <div className="trade-buttons">
          <button className="bid-btn" onClick={handleSubmit}>
            판매 등록
          </button>
          <button
            className="cancel-btn"
            onClick={() => setShowPriceModal(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

function Trade({ item, setShow, handleBuyNFT }) {
  return (
    <div className="trade-content" onClick={() => setShow(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>구입하기</h2>
        <img src={item.img} alt={item.name} className="trade-img" />
        <h3>{item.name}</h3>
        <div className="trade-info">
          <p>6일후 마감</p>
          <p className="item-price">{item.price}p</p>
        </div>
        <div className="trade-buttons">
          <button className="bid-btn" onClick={() => handleBuyNFT(item)}>
            구입하기
          </button>
          <button className="cancel-btn" onClick={() => setShow(false)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

function Buy({ sample, trademain, setSell, sell }) {
  let navigate = useNavigate();
  return (
    <div className="Mcon">
      <div className="mtitle">
        <button className="tshow" onClick={()=>navigate("/market/tshow")}>
          거래내역
        </button>
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
                <p>{item.price}p</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sell({ setSell, sell, myNFTs, openPriceModal }) {
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
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        팔 NFT를 선택하세요
      </div>
      <div className="market">
        {myNFTs.map((nft) => {
          return (
            <div
              key={nft.id}
              className="tradecon"
              onClick={() => openPriceModal(nft)}
            >
              <div className="pro">
                <img src={nft.img} className="mimg" alt={nft.name} />
                <div>{nft.name}</div>
              </div>
              <div className="sub">
                <p>판매하기</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Market;
