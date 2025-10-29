import React from 'react';
import '../../css/Admincss/Admin-FT.css';
import search from '../../../img/searchIcon.svg';

export default function FtManagement() {
    return (
        <div className="search-bar">
            <div>
                <img src={search} alt="검색아이콘"></img>
            </div>
            <input 
                placeholder="FT ID를 입력해주세요"
            />
        </div>
    );
}

