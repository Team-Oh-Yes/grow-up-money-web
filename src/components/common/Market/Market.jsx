import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [myNFTs, setMyNFTs] = useState([]);

  const fetchData = async () => {
    try {
      const resm = await axiosInstance.get("/nft/my");
      const res = await axiosInstance.get("/market/listings");
      console.log('내꺼',resm.data)
      console.log(res.data)
      if (resm.data && resm.data.tradeableNfts) {
        setMyNFTs(resm.data.tradeableNfts);
      }
      
      if (res.data) {
        // listings 데이터가 배열인지 확인 후 설정
        const listData = Array.isArray(res.data) ? res.data : (res.data.listings || []);
        setListings(listData);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  const trademain = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const openPriceModal = (nft) => {
    setSelectedNFTForSale(nft);
    setShowPriceModal(true);
  };

  // UI 상태 즉시 업데이트 함수
  const handleSellNFT = (nft, price) => {
    // tokenId로 비교하여 내 목록에서 제거
    setMyNFTs(prev => prev.filter((item) => item.tokenId !== nft.tokenId));
    // 마켓 목록에 추가
    setListings(prev => [...prev, { ...nft, price: price }]);
    setShowPriceModal(false);
  };

  const handleBuyNFT = (item) => {
    setListings(prev => prev.filter((listing) => listing.tokenId !== item.tokenId));
    const { price, ...nftWithoutPrice } = item;
    setMyNFTs(prev => [...prev, nftWithoutPrice]);
    setShow(false);
  };

  return (
    <>
      {sell === false ? (
        <Buy sample={listings} trademain={trademain} setSell={setSell} sell={sell} />
      ) : (
        <Sell setSell={setSell} sell={sell} myNFTs={myNFTs} openPriceModal={openPriceModal} />
      )}
      {show && <Trade item={selectedItem} setShow={setShow} handleBuyNFT={handleBuyNFT} />}
      {showPriceModal && <PriceModal nft={selectedNFTForSale} setShowPriceModal={setShowPriceModal} handleSellNFT={handleSellNFT} />}
    </>
  );
}

function PriceModal({ nft, setShowPriceModal, handleSellNFT }) {
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    const numPrice = parseInt(price);
    if (!numPrice || numPrice <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }

    try {
      // 서버 전송 데이터 (보여주신 객체 구조에 맞춰 collectionId 등 추가 권장)
      const sellData = {
        tokenId: nft.tokenId,
        price: numPrice,
        collectionId: nft.collectionId // 추가 데이터
      };

      await axiosInstance.post("/market/listings", sellData);
      
      // 서버 성공 시 UI 업데이트 호출
      handleSellNFT(nft, numPrice);
      alert("판매 등록되었습니다.");
    } catch (error) {
      console.error("등록 실패 상세 에러:", error.response?.data || error.message);
      alert("등록 실패: " + (error.response?.data?.message || "서버 오류"));
    }
  };

  return (
    <div className="trade-content" onClick={() => setShowPriceModal(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>판매 가격 설정</h2>
        <img src={nft?.nftImageUrl} className="trade-img" alt="" />
        <h3>{nft?.collectionName}</h3>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="price-input" 
          placeholder="가격을 입력하세요"
        />
        <div className="trade-buttons">
          <button className="bid-btn" onClick={handleSubmit}>판매 등록</button>
          <button className="cancel-btn" onClick={() => setShowPriceModal(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}

// Trade, Buy, Sell 컴포넌트는 기존과 동일 (생략 방지를 위해 유지)
function Trade({ item, setShow, handleBuyNFT }) {
  return (
    <div className="trade-content" onClick={() => setShow(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>구입하기</h2>
        <img src={item?.nftImageUrl} className="trade-img" alt="" />
        <h3>{item?.collectionName}</h3>
        <p className="item-price">{item?.price}p</p>
        <div className="trade-buttons">
          <button className="bid-btn" onClick={() => handleBuyNFT(item)}>구입하기</button>
          <button className="cancel-btn" onClick={() => setShow(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}

function Buy({ sample, trademain, setSell, sell }) {
  return (
    <div className="Mcon">
      <div className="mtitle">거래소 <button className="sbt" onClick={() => setSell(!sell)}>판매하기</button></div>
      <div className="market">
        {sample.map((item, idx) => (
          <div key={item.tokenId || idx} className="tradecon" onClick={() => trademain(item)}>
            <div className="pro">
              <img src={item.nftImageUrl} className="mimg" alt="" />
              <div>{item.collectionName}</div>
            </div>
            <div className="sub"><p>{item.price}p</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sell({ setSell, sell, myNFTs, openPriceModal }) {
  return (
    <div className="Mcon">
      <div className="mtitle">판매하기 <button className="sbt" onClick={() => setSell(!sell)}>구매하기</button></div>
      <div className="market">
        {myNFTs.map((nft, idx) => (
          <div key={nft.tokenId || idx} className="tradecon" onClick={() => openPriceModal(nft)}>
            <div className="pro">
              <img src={nft.nftImageUrl} className="mimg" alt="" />
              <div>{nft.collectionName}</div>
            </div>
            <div className="sub"><p>판매하기</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;