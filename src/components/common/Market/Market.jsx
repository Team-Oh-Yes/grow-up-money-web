import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

      if (resm.data && resm.data.tradeableNfts) {
        setMyNFTs(resm.data.tradeableNfts);
      }

      if (res.data) {
        const listData = Array.isArray(res.data)
          ? res.data
          : res.data.listings || [];
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

  // 판매 등록 핸들러
  const handleSellNFT = (nft, price) => {
    setMyNFTs((prev) => prev.filter((item) => item.tokenId !== nft.tokenId));
    setListings((prev) => [...prev, { ...nft, price: price }]);
    setShowPriceModal(false);
  };

  // 구매 요청 핸들러 (수정됨)
  const handleBuyNFT = async (item) => {
    try {
      const response = await axiosInstance.post("/market/purchase", {
        tradeId: item.tradeId,
      });
      console.log("구매 성공:", response.data);
      setListings((prev) =>
        prev.filter((listing) => listing.tokenId !== item.tokenId)
      );
      const { price, ...nftWithoutPrice } = item;
      setMyNFTs((prev) => [...prev, nftWithoutPrice]);
      setShow(false);
      alert("구매가 완료되었습니다.");
    } catch (error) {
      console.error("구매 실패:", error.response?.data || error.message);
      alert("구매 실패: " + (error.response?.data?.message || "서버 오류"));
    }
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
      {show && (
        <Trade
          item={selectedItem}
          setShow={setShow}
          handleBuyNFT={handleBuyNFT}
        />
      )}
      {showPriceModal && (
        <PriceModal
          nft={selectedNFTForSale}
          setShowPriceModal={setShowPriceModal}
          handleSellNFT={handleSellNFT}
        />
      )}
    </>
  );
}

// 판매 가격 설정 모달
function PriceModal({ nft, setShowPriceModal, handleSellNFT }) {
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    const numPrice = parseInt(price);
    if (!numPrice || numPrice <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }

    try {
      const sellData = {
        tokenId: nft.tokenId,
        price: numPrice,
        collectionId: nft.collectionId,
      };

      await axiosInstance.post("/market/listings", sellData);
      handleSellNFT(nft, numPrice);
      alert("판매 등록되었습니다.");
    } catch (error) {
      console.error("등록 실패:", error.response?.data || error.message);
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

// 상품 구매 모달
function Trade({ item, setShow, handleBuyNFT }) {
  return (
    <div className="trade-content" onClick={() => setShow(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>구입하기</h2>
        <img src={item?.nftImageUrl} className="trade-img" alt="" />
        <h3>{item?.collectionName}</h3>
        <p className="item-price">{item?.price}p</p>
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

// 거래소 목록 (구매 탭)
function Buy({ sample, trademain, setSell, sell }) {
  return (
    <div className="Mcon">
      <div className="mtitle">
        거래소{" "}
        <button className="sbt" onClick={() => setSell(!sell)}>
          판매하기
        </button>
      </div>
      <div className="market">
        {sample.map((item, idx) => (
          <div
            key={item.tokenId || idx}
            className="tradecon"
            onClick={() => trademain(item)}
          >
            <div className="pro">
              <img src={item.nftImageUrl} className="mimg" alt="" />
              <div>{item.collectionName}</div>
            </div>
            <div className="sub">
              <p>{item.price}p</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 내 인벤토리 목록 (판매 탭)
function Sell({ setSell, sell, myNFTs, openPriceModal }) {
  return (
    <div className="Mcon">
      <div className="mtitle">
        판매하기{" "}
        <button className="sbt" onClick={() => setSell(!sell)}>
          구매하기
        </button>
      </div>
      <div className="market">
        {myNFTs.map((nft, idx) => (
          <div
            key={nft.tokenId || idx}
            className="tradecon"
            onClick={() => openPriceModal(nft)}
          >
            <div className="pro">
              <img src={nft.nftImageUrl} className="mimg" alt="" />
              <div>{nft.collectionName}</div>
            </div>
            <div className="sub">
              <p>판매하기</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
