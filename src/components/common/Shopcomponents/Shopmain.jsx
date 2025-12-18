import { useLocation } from "react-router-dom";
import Goods from "./Goods";
import Point from "./Point";
import Random from "./Random";
import Shop from "./Shop";
import ShopHeader from "./Shopheader";

function Shopmain() {
  const location = useLocation();

  // ✨ 경로 포함 여부 확인 (변수명 중복 방지를 위해 소문자 권장)
  const isShop = location.pathname.includes("/shop/shop");
  const isGoods = location.pathname.includes("/shop/goods");
  const isPoints = location.pathname.includes("/shop/points");
  const isRandom = location.pathname.includes("/shop/random");

  return (
    <div>
      <ShopHeader />

      {/* ✨ 조건부 렌더링: true인 컴포넌트만 화면에 나타남 */}
      <div className="ShopContent">
        {isShop && <Shop />}
        {isGoods && <Goods />}
        {isPoints && <Point />}
        {isRandom && <Random />}
      </div>
    </div>
  );
}

export default Shopmain;
