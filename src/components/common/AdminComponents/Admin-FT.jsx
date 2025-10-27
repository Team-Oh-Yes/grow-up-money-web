import React from 'react';
import '../../css/Admincss/Admin-FT.css';
import search from '../../../img/searchIcon.svg';
import logo from '../../../img/logo.png';

export default function UserManagement() {
    const users = [
        { id: 'test1234', email: 'test1234@dgsw.hs.kr', status: '영구 정지' },
        { id: 'test5678', email: '-', status: '1주 정지' },
        { id: 'test9876', email: 'test9876@dgsw.hs.kr', status: '정상' },
    ];

    // const getStatusClass = (status) => {
    //     if (status === '정상') return 'status-normal';
    //     else if (status === '영구 정지') return 'status-banned';
    //     else if (status === '1개월 정지') return 'status-suspended-month';
    //     else if (status === '3주 정지') return 'status-suspended-3weeks';
    //     else if (status === '1주 정지') return 'status-suspended-week';
    //     else if (status === '1일 정지') return 'status-suspended-1day';
    // };

    return (
        <div className="user-management">
            <div className="header">
                <div className="logo-area">
                    {/* <div>Grow Money</div> */}
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
                <input placeholder="검색어를 입력해주세요." />
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
                    {users.map((u, i) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
