import '../../css/Admincss/Admin-FT-history.css';
import Popup from './Popup';

const AdminFTHistory = ({ history, onClose }) => {
    return (
        <Popup onClose={onClose} title="소유자 히스토리">
            <div className="history-list">
                {history.map((item, index) => (
                    <div key={index} className="history-item">
                        <span className="history-date">{item.date}</span>
                        <span className="history-owner">{item.owner}</span>
                        <span className="history-type">{item.type}</span>
                    </div>
                ))}
            </div>
        </Popup>
    );
};

export default AdminFTHistory;
