// Link import
import "../../css/ShopComponents/ShopContent.css";

// AxiosInstance import

// Img import
import diamond from "../../../img/Icon/diamond.svg";
import ticket from "../../../img/ShopComponents/ticket.svg";

// Const
export default function ShopContent() {
  return (
    <>
      <div className="shop-main">
        <div className="shop-info-item">
          <div className="shop-info-img">
            <img src={ticket} alt="ticket" />
          </div>
          <div className="shop-info-title">울트라 슈퍼 뽑기권 5장</div>
          <div className="shop-info-buy-button">
            <img src={diamond} alt="diamond" />
            <div className="shop-buy-price">1000</div>
          </div>
        </div>
      </div>
    </>
  );
}
