import { useState } from 'react';
import logo from '../../../img/logo.png';
import UserPage from './Admin-USER';
import '../../css/Admincss/AdminPages.css';
import FtPage from './Admin-FT'
// import RefundPage from './Admin-Refund'
// import EtcPage from './Admin-ETC'

const AdminPages = () => {
    const [activeTab, setActiveTab] = useState('user');

    const Render = () => {
        switch (activeTab) {
            case 'user':
                return <UserPage />;
            case 'nft':
                return <FtPage />;
            case 'refund':
                return <RefundPage />;
            case 'etc':
                return <EtcPage />;
            default:
                return null;
        }
    };

    return (
        <div className="user-management">
            <div className="header">
                <div className="logo-area">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="nav-tabs">
                    <span
                        className={activeTab === 'user' ? 'active' : ''}
                        onClick={() => setActiveTab('user')}
                    >
                        유저 관리
                    </span>
                    <span
                        className={activeTab === 'nft' ? 'active' : ''}
                        onClick={() => setActiveTab('nft')}
                    >
                        FT 관리
                    </span>
                    <span
                        className={activeTab === 'refund' ? 'active' : ''}
                        onClick={() => setActiveTab('refund')}
                    >
                        환불/문의
                    </span>
                    <span
                        className={activeTab === 'etc' ? 'active' : ''}
                        onClick={() => setActiveTab('etc')}
                    >
                        기타
                    </span>
                </div>
            </div>
            <div className="pageRender">{Render()}</div>
        </div>
    );
};

export default AdminPages;
