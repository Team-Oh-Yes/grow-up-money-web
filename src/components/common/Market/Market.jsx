import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const handleSellNFT = (nft, price) => {
    setMyNFTs((prev) => prev.filter((item) => item.tokenId !== nft.tokenId));
    setListings((prev) => [...prev, { ...nft, price: price }]);
    setShowPriceModal(false);
  };

  const handleBuyNFT = async (item) => {
    try {
      const response = await axiosInstance.post("/market/purchase", {
        tradeId: item.tradeId,
      });

      Swal.fire({
        title: "구매 성공!",
        text: "NFT가 보관함에 추가되었습니다.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });
      
      setListings((prev) =>
        prev.filter((listing) => listing.tokenId !== item.tokenId)
      );
      const { price, ...nftWithoutPrice } = item;
      setMyNFTs((prev) => [...prev, nftWithoutPrice]);
      setShow(false);
    } catch (error) {
      // ✨ 400 에러 처리 추가
      const isSelfListed = error.response?.status === 400;

      Swal.fire({
        title: "구매 실패",
        text: isSelfListed 
          ? "자신이 올렸던 항목입니다." 
          : (error.response?.data?.message || "서버 오류가 발생했습니다."),
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>데이터를 불러오는 중입니다...</p>
          </div>
        </div>
      )}

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

function PriceModal({ nft, setShowPriceModal, handleSellNFT }) {
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    const numPrice = parseInt(price);
    if (!numPrice || numPrice <= 0) {
      Swal.fire({
        text: "올바른 가격을 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    try {
      const sellData = {
        tokenId: nft.tokenId,
        price: numPrice,
        collectionId: nft.collectionId,
      };

      await axiosInstance.post("/market/listings", sellData);
      
      Swal.fire({
        title: "등록 완료",
        text: "판매소에 성공적으로 등록되었습니다.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      handleSellNFT(nft, numPrice);
    } catch (error) {
      Swal.fire({
        title: "등록 실패",
        text: error.response?.data?.message || "서버 오류",
        icon: "error",
      });
    }
  };

  return (
    <div className="trade-content" onClick={() => setShowPriceModal(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>판매 가격 설정</h2>
        <img src={nft?.imageUrl} className="trade-img" alt="" />
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

function Trade({ item, setShow, handleBuyNFT }) {
  return (
    <div className="trade-content" onClick={() => setShow(false)}>
      <div className="trade-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>구입하기</h2>
        <img src={item?.imageUrl} className="trade-img" alt="" />
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
      <div className="mtitle">
        거래소{" "}
        <button className="sbt" onClick={() => setSell(!sell)}>판매하기</button>
      </div>
      <div className="market">
        {sample.map((item, idx) => (
          <div key={item.tokenId || idx} className="tradecon" onClick={() => trademain(item)}>
            <div className="pro">
              <img src={item.imageUrl} className="mimg" alt="" />
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
      <div className="mtitle">
        판매하기{" "}
        <button className="sbt" onClick={() => setSell(!sell)}>구매하기</button>
      </div>
      <div className="market">
        {myNFTs.map((nft, idx) => (
          <div key={nft.tokenId || idx} className="tradecon" onClick={() => openPriceModal(nft)}>
            <div className="pro">
              <img src={nft.imageUrl} className="mimg" alt="" />
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