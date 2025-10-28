import React, { useState } from 'react';
import '../../css/Admincss/Admin-USER.css';
import search from '../../../img/searchIcon.svg';
import logo from '../../../img/logo.png';

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: 'test1234', email: 'test1234@dgsw.hs.kr', status: '영구 정지' },
        { id: 'test5678', email: '-', status: '1주 정지' },
        { id: 'test9876', email: 'test9876@dgsw.hs.kr', status: '정상' },
    ];

    // 한글 초성 추출 함수
    const getChosung = (str) => {
        const chosung = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        let result = '';
        
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i) - 44032;
            if (code > -1 && code < 11172) {
                result += chosung[Math.floor(code / 588)];
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    };

    // 검색 필터링 로직 (ID 기준, 초성 검색 포함)
    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        const userId = user.id.toLowerCase();
        const userIdChosung = getChosung(user.id);
        
        return userId.includes(search) || userIdChosung.includes(searchTerm);
    });

    return (
        <div className="user-management">
            <div className="header">
                <div className="logo-area">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="nav-tabs">
                    <span className="active">유저 관리</span>
                    <span>NFT 관리</span>
                    <span>환불/문의</span>
                    <span>기타</span>
                </div>
            </div>

            <div className="search-bar">
                <div>
                    <img src={search} alt="검색아이콘"></img>
                </div>
                <input 
                    placeholder="유저 ID를 입력해주세요. (초성 검색 가능)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>ID</th>
                        <th>이메일</th>
                        <th>계정 상태</th>
                        <th>상태 제어</th>
                        <th>포인트 지급</th>
                        <th>계정 복구</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((u, i) => (
                            <tr key={i}>
                                <td><input type="checkbox" /></td>
                                <td>{u.id}</td>
                                <td>{u.email}</td>
                                <td className={u.status === '정상' ? 'status-normal' : 'status-banned'}>{u.status}</td>
                                <td>
                                    <button className={`btn-status ${u.status === '영구 정지' ? 'active' : ''}`}>계정 정지</button>
                                </td>
                                <td>
                                    <button className={`btn-point ${u.status === '영구 정지' ? 'active' : ''}`}>포인트 지급</button>
                                </td>
                                <td>
                                    <button className={`btn-recover ${u.status === '영구 정지' ? 'active' : ''}`}>
                                        유저 계정 복구
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                검색 결과가 없습니다
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}