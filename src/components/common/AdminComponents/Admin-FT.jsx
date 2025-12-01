import React, { useState, useMemo } from 'react';
import '../../css/Admincss/Admin-FT.css';
import searchIcon from '../../../img/searchIcon.svg';
import AdminFTHistory from './Admin-FT-history';

// Mock Data
const MOCK_FTS = [
    { id: 1, name: '똥전-1', owner: '-', issueDate: '발급되지 않음', status: '미발급', history: [] },
    {
        id: 2, name: '머니또-1', owner: '배준하', issueDate: '2025.09.09', status: '발급 - 판매중', history: [
            { date: '2025.09.09', owner: '배준하', type: '최초 발급' }
        ]
    },
    {
        id: 3, name: '머니또-1', owner: '홍준기', issueDate: '2025.09.09', status: '발급 - 소유중', history: [
            { date: '2025.09.09', owner: '홍준기', type: '최초 발급' }
        ]
    },
];

const STATUS_STYLES = {
    '미발급': 'status-unissued',
    '발급 - 판매중': 'status-selling',
    '발급 - 소유중': 'status-owned'
};

export default function FtManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHistory, setSelectedHistory] = useState(null);

    const filteredFTs = useMemo(() => {
        if (!searchTerm) return MOCK_FTS;
        return MOCK_FTS.filter(ft =>
            ft.name.includes(searchTerm) ||
            ft.owner.includes(searchTerm)
        );
    }, [searchTerm]);

    const handleIssue = (id) => {
        alert(`NFT (ID: ${id}) 발급 기능은 준비중입니다.`);
    };

    return (
        <div className="ft-management">
            <div className="search-bar">
                <img src={searchIcon} alt="검색" />
                <input
                    placeholder="검색어를 입력해주세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="ft-table-container">
                <table className="ft-table">
                    <thead>
                        <tr>
                            <th className="checkbox-col"><input type="checkbox" /></th>
                            <th>NFT명</th>
                            <th>소유자(ID)</th>
                            <th>발급일</th>
                            <th>소유자 히스토리</th>
                            <th>상태</th>
                            <th>NFT 발급하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFTs.map(ft => (
                            <tr key={ft.id}>
                                <td className="checkbox-col"><input type="checkbox" /></td>
                                <td>{ft.name}</td>
                                <td>{ft.owner}</td>
                                <td className={ft.issueDate === '발급되지 않음' ? 'text-red' : ''}>
                                    {ft.issueDate}
                                </td>
                                <td>
                                    <button
                                        className={`btn-history ${ft.history.length === 0 ? 'disabled' : ''}`}
                                        onClick={() => ft.history.length > 0 && setSelectedHistory(ft.history)}
                                        disabled={ft.history.length === 0}
                                    >
                                        소유자 히스토리 보기
                                    </button>
                                </td>
                                <td>
                                    <span className={`status-badge ${STATUS_STYLES[ft.status]}`}>
                                        {ft.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={`btn-issue ${ft.status !== '미발급' ? 'disabled' : ''}`}
                                        onClick={() => handleIssue(ft.id)}
                                        disabled={ft.status !== '미발급'}
                                    >
                                        NFT 발급하기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedHistory && (
                <AdminFTHistory
                    history={selectedHistory}
                    onClose={() => setSelectedHistory(null)}
                />
            )}
        </div>
    );
}
