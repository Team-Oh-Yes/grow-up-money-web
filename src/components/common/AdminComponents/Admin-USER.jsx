import React, { useState, useCallback, useMemo, useEffect } from 'react';
import '../../css/Admincss/Admin-USER.css';
import search from '../../../img/searchIcon.svg';
import StatusPopup from './Admin-USER-status.jsx';
import axios from 'axios';

const sever = 'http://16.171.8.148:8080';

// 페이지네이션 상수
const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

// 한글 검색 유틸리티 함수
const hangulIncludes = (text, search) => {
    if (!search) return true;
    
    const normalize = (str) => str.toLowerCase().replace(/\s/g, '');
    const normalizedText = normalize(text);
    const normalizedSearch = normalize(search);
    
    // 기본 포함 검색
    if (normalizedText.includes(normalizedSearch)) return true;
    
    // 초성 검색
    const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    
    const getChosung = (char) => {
        const code = char.charCodeAt(0);
        if (code >= 44032 && code <= 55203) {
            return CHO[Math.floor((code - 44032) / 588)];
        }
        return char;
    };
    
    const textChosung = Array.from(normalizedText).map(getChosung).join('');
    return textChosung.includes(normalizedSearch);
};

// 상수 정의
const USER_STATUS = {
    NORMAL: '정상',
    PERMANENT: '영구 정지',
    ONE_DAY: '1일 정지',
    THREE_DAYS: '3일 정지',
    ONE_WEEK: '1주 정지',
    ONE_MONTH: '1달 정지'
};

const ACTION_TYPES = {
    BAN: 'ban',
    POINT: 'point',
    RECOVER: 'recover'
};

// 검색바 컴포넌트
const SearchBar = ({ value, onChange }) => (
    <div className="search-bar">
        <div>
            <img src={search} alt="검색아이콘" />
        </div>
        <input 
            type="text"
            placeholder="유저 ID를 입력해주세요. (초성 검색 가능)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

// 액션 버튼 컴포넌트
const ActionButton = ({ type, status, onClick, disabled }) => {
    const buttonConfig = {
        [ACTION_TYPES.BAN]: { 
            label: '계정 정지', 
            className: 'btn-status',
            isActive: status !== USER_STATUS.NORMAL
        },
        [ACTION_TYPES.POINT]: { 
            label: '포인트 지급', 
            className: 'btn-point',
            isActive: false
        },
        [ACTION_TYPES.RECOVER]: { 
            label: '유저 계정 복구', 
            className: 'btn-recover',
            isActive: status !== USER_STATUS.NORMAL
        }
    };

    const config = buttonConfig[type];

    return (
        <button 
            className={`${config.className} ${config.isActive ? 'active' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {config.label}
        </button>
    );
};

// 유저 행 컴포넌트
const UserRow = React.memo(({ user, onAction, onBanClick }) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td className={user.status === USER_STATUS.NORMAL ? 'status-normal' : 'status-banned'}>
                {user.status}
            </td>
            <td>
                <ActionButton 
                    type={ACTION_TYPES.BAN}
                    status={user.status}
                    onClick={() => onBanClick(user)}
                    disabled={user.status !== USER_STATUS.NORMAL}
                />
            </td>
            <td>
                <ActionButton 
                    type={ACTION_TYPES.POINT}
                    status={user.status}
                    onClick={() => onAction(user.id, ACTION_TYPES.POINT)}
                />
            </td>
            <td>
                <ActionButton 
                    type={ACTION_TYPES.RECOVER}
                    status={user.status}
                    onClick={() => onAction(user.id, ACTION_TYPES.RECOVER)}
                    disabled={user.status === USER_STATUS.NORMAL}
                />
            </td>
        </tr>
    );
});

// 빈 상태 컴포넌트
const EmptyState = () => (
    <tr>
        <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            검색 결과가 없습니다
        </td>
    </tr>
);

// 로딩 상태 컴포넌트
const LoadingState = () => (
    <tr>
        <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            로딩 중...
        </td>
    </tr>
);

// 메인 컴포넌트
export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: DEFAULT_PAGE,
        totalPages: 0,
        totalElements: 0,
        size: DEFAULT_SIZE,
        isFirst: true,
        isLast: true
    });

    // 팝업 상태
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 유저 목록 가져오기
    const GetUserRow = async(page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${sever}/admin/users/`, {
                params: { page, size }
            });
            
            // API 응답에서 content 배열과 페이지네이션 정보 추출
            const data = res.data;
            
            const mappedUsers = data.content.map(user => ({
                id: user.username,
                email: user.email,
                status: user.status === 'ACTIVE' ? USER_STATUS.NORMAL : USER_STATUS.PERMANENT,
                role: user.role,
                created_at: user.created_at,
                updated_at: user.updated_at
            }));
            
            setUsers(mappedUsers);
            setPagination({
                currentPage: data.number,
                totalPages: data.totalPages || 0,
                totalElements: data.numberOfElements || 0,
                size: data.size,
                isFirst: data.first,
                isLast: data.last
            });
        } catch (error) {
            console.error("유저 목록을 불러오는데 실패했습니다", error);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }

    // 컴포넌트 마운트 시 유저 목록 로드
    useEffect(() => {
        GetUserRow();
    }, []);

    // 필터링된 유저 목록
    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return users;
        return users.filter(user => hangulIncludes(user.id, searchTerm));
    }, [users, searchTerm]);

    // 계정 정지 버튼 클릭 시 팝업 오픈
    const handleBanClick = useCallback((user) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
    }, []);

    // 팝업 닫기 핸들러
    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
        setSelectedUser(null);
    }, []);

    // 액션 핸들러 (포인트 지급, 복구)
    const handleAction = useCallback((userId, actionType) => {
        setUsers(prevUsers => 
            prevUsers.map(user => {
                if (user.id !== userId) return user;

                switch (actionType) {
                    case ACTION_TYPES.POINT:
                        // alert(`${userId}에게 포인트를 지급합니다.`);
                        return user;
                    
                    case ACTION_TYPES.RECOVER:
                        // alert(`${userId} 계정을 복구합니다.`);
                        return { ...user, status: USER_STATUS.NORMAL };
                    
                    default:
                        return user;
                }
            })
        );
    }, []);

    return (
        <div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

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
                    {isLoading ? (
                        <LoadingState />
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <UserRow 
                                key={user.id}
                                user={user}
                                onAction={handleAction}
                                onBanClick={() => handleBanClick(user)}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </tbody>
            </table>

            {/* 팝업 렌더링 */}
            {isPopupOpen && (
                <StatusPopup 
                    user={selectedUser}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}