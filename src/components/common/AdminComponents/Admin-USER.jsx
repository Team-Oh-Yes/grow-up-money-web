import React, { useState } from 'react';
import { hangulIncludes } from 'es-hangul';
import '../../css/Admincss/Admin-USER.css';
import search from '../../../img/searchIcon.svg';

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: 'test1234', email: 'test1234@dgsw.hs.kr', status: '영구 정지' },
        { id: 'test5678', email: '-', status: '1주 정지' },
        { id: 'test9876', email: 'test9876@dgsw.hs.kr', status: '정상' },
        { id: '배준하', email: 'junha0729@dgsw.hs.kr', status: '정상' },
    ];

    const filteredUsers = users.filter(user => 
        hangulIncludes(user.id, searchTerm)
    );

    return (
        <div>
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
                                <td>{u.id}</td>
                                <td>{u.email}</td>
                                <td className={u.status === '정상' ? 'status-normal' : 'status-banned'}>
                                    {u.status}
                                </td>
                                <td>
                                    <button className={`btn-status ${u.status === '영구 정지' ? 'active' : ''}`}>
                                        계정 정지
                                    </button>
                                </td>
                                <td>
                                    <button className={`btn-point ${u.status === '영구 정지' ? 'active' : ''}`}>
                                        포인트 지급
                                    </button>
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
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                검색 결과가 없습니다
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}