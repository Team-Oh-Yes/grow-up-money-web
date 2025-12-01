import React from 'react';
import '../../css/Admincss/Admin-FT.css';

const AdminFTHistory = ({ history, onClose }) => {
    return (
        <div className="history-popup-overlay">
            <div className="history-popup">
                <div className="history-popup-header">
                    <h2>소유자 히스토리</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="history-list">
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                            <span className="history-date">{item.date}</span>
                            <span className="history-owner">{item.owner}</span>
                            <span className="history-type">{item.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminFTHistory;
