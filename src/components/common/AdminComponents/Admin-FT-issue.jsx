import React from 'react';
import '../../css/Admincss/Admin-FT-issue.css';

const AdminFTIssue = ({ onClose }) => {
    return (
        <div className="history-popup-overlay" onClick={onClose}>
            <div className="history-popup" onClick={(e) => e.stopPropagation()}>
                <div className="history-popup-header">
                    <h2>FT 발급 (임시)</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="issue-content">
                    <p>FT 발급 기능을 여기에 구현할 예정입니다.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminFTIssue;
