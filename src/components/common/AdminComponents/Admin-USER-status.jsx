import React, { useState } from 'react';
import '../../css/Admincss/Admin-USER-status.css';
import axios from 'axios';

const sever = 'http://localhost:8080';


export default function StatusPopup({ user, onClose }) {
    const [selected, setSelected] = useState('');
    const [reason, setReason] = useState('');

    const handleSelect = (value) => setSelected(value);

    const usersuspend = ({id, label, reason}) => {
        let res
        try { res = axios.post(`${sever}/admin/user/suspend`, {
            "username": id,
            "suspensionType" : label,
            "reason": reason
        })
        } catch (error) {
            console.error("유저 상태 정지에 실패했습니다", error);
        }};

    return (
        <div className="status-popup-overlay">
            <div className="status-popup">
                <div className="status-popup-header">
                    <h2>{user.id}님의 상태 제어</h2>
                    <button
                        className="status-popup-close"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                <div className="status-section">
                    <p className="status-section-title">정지 지속 시간</p>
                    <div className="status-duration">
                        {['1일', '3일', '1주','1달', '영구'].map((label) => (
                            <button
                                key={label}
                                className={selected === label ? 'active' : ''}
                                onClick={() => handleSelect(label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="reason-section">
                    <label>사유</label>
                    <textarea
                        className="reason-box"
                        placeholder="정지 사유를 입력해주세요."
                        maxLength={299}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <div className="char-count">
                        {reason.length}/300
                    </div>
                </div>

                <div className="status-popup-footer">
                    <button
                        className="status-save-btn"
                        onClick={() => {usersuspend({id: user.id, label: selected, reason: reason})}}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}
