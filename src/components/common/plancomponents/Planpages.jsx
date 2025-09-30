import "../../css/Planpages/Planpages.css";

import homeIcon from "../../../img/NavImages/home.svg";
import rankIcon from "../../../img/NavImages/ranking.svg";
import graphIcon from "../../../img/NavImages/graph.svg";
import storeIcon from "../../../img/NavImages/store.svg";
import account from "../../../img/NavImages/account.svg";
import more from "../../../img/NavImages/more.svg";

function Planpages() {
    return (
        <nav className="sideBar">
            <div className="sidebar-title">Oh!Yes</div>
            <div className="list">
                <a href="" className="loadMap">
                    <div className="main">
                        <img src={homeIcon} alt="home" />
                        <div>로드맵</div>
                    </div>
                </a>
                <a href="" className="ranking">
                    <div className="main">
                        <img src={rankIcon} alt="ranking" />
                        <div>랭킹</div>
                    </div>
                </a>
                <a href="" className="exchange">
                    <div className="main">
                        <img src={graphIcon} alt="exchange" />
                        <div>거래소</div>
                    </div>
                </a>
                <a href="" className="store">
                    <div className="main">
                        <img src={storeIcon} alt="store" />
                        <div>상점</div>
                    </div>
                </a>
                <a href="" className="account">
                    <div className="main">
                        <img src={account} alt="account" />
                        <div>프로필</div>
                    </div>
                </a>
                <a href="" className="more">
                    <div className="main">
                        <img src={more} alt="more" />
                        <div>더보기</div>
                    </div>
                </a>
            </div>
        </nav>

        
    );
}

export default Planpages;
